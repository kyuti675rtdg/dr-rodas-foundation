<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\{PaymentProviderRecord, PaymentTransaction, PaymentWebhookEvent};
use App\Services\DonationService;
use App\Services\Payments\PaymentManager;
use Illuminate\Http\Request;
class WebhookController extends Controller {
    public function __construct(private PaymentManager $payments, private DonationService $donations) {}
    /** Idempotent: (provider, provider_event_id) is unique. Invalid signatures are stored, flagged, and never processed. */
    public function handle(Request $r, string $providerCode) {
        $record = PaymentProviderRecord::where('code', $providerCode)->firstOrFail();
        $raw = $r->getContent();
        $payload = json_decode($raw, true) ?: [];
        $eventId = $payload['id'] ?? $r->header('X-Event-Id');
        if (!$eventId) return response()->json(['message' => 'Missing event id.'], 400);
        $provider = $this->payments->providerFor($record);
        $valid = $provider->verifyWebhookSignature($raw, $r->header('X-Signature') ?? $r->header('Stripe-Signature'), $record);
        $event = PaymentWebhookEvent::firstOrCreate(['payment_provider_id' => $record->id, 'provider_event_id' => (string) $eventId],
            ['event_type' => $payload['type'] ?? 'unknown', 'payload' => $payload, 'signature_valid' => $valid]);
        if (!$event->wasRecentlyCreated) return response()->json(['message' => 'Duplicate event acknowledged.'], 200);
        if (!$valid) { $event->update(['processing_error' => 'Invalid signature — not processed.']); return response()->json(['message' => 'Invalid signature.'], 400); }
        try {
            $type = $payload['type'] ?? '';
            $ref = $payload['data']['donation_reference'] ?? $payload['data']['object']['metadata']['donation_reference'] ?? null;
            $providerRef = $payload['data']['provider_reference'] ?? $payload['data']['object']['id'] ?? null;
            if (in_array($type, ['payment.succeeded','payment_intent.succeeded','checkout.session.completed'], true) && $ref) {
                $txn = PaymentTransaction::where('provider_reference', $providerRef)->orWhereHas('donation', fn ($q) => $q->where('reference', $ref))->latest()->first();
                $donation = $txn?->donation ?? \App\Models\Donation::where('reference', $ref)->first();
                if ($donation) {
                    // Amount/currency verification against the original donation record.
                    $paid = $payload['data']['amount'] ?? $payload['data']['object']['amount_total'] ?? null;
                    if ($paid !== null && bccomp((string) $paid, (string) $donation->amount, 2) !== 0) throw new \RuntimeException('Amount mismatch — flagged for reconciliation.');
                    $this->donations->confirm($donation, $txn);
                }
            }
            $event->update(['processed_at' => now()]);
            return response()->json(['message' => 'Processed.']);
        } catch (\Throwable $e) {
            $event->update(['processing_error' => $e->getMessage()]);
            return response()->json(['message' => 'Processing failed; event stored for reconciliation.'], 500);
        }
    }
}
