<?php
namespace App\Services;
use App\Models\{Campaign, Currency, Donation, DonationReceipt, NotificationLog, PaymentTransaction, RecurringDonation};
use App\Services\Payments\PaymentManager;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class DonationService {
    public function __construct(private PaymentManager $payments) {}
    public function initiate(array $data, ?int $userId = null): array {
        if (!empty($data['idempotency_key'])) {
            $existing = Donation::where('idempotency_key', $data['idempotency_key'])->first();
            if ($existing) return ['donation' => $existing, 'payment' => ['state' => 'duplicate_prevented'], 'duplicate' => true];
        }
        $campaign = Campaign::where('status', 'published')->findOrFail($data['campaign_id']);
        $currency = Currency::where('code', strtoupper($data['currency'] ?? 'USD'))->firstOrFail();
        return DB::transaction(function () use ($data, $campaign, $currency, $userId) {
            $donation = Donation::create([
                'reference' => 'DRF-' . now()->format('Y') . '-' . strtoupper(Str::random(8)),
                'campaign_id' => $campaign->id, 'user_id' => $userId,
                'designation' => $data['designation'] ?? 'general', 'donation_type' => $data['donation_type'] ?? 'one_time',
                'amount' => $data['amount'], 'currency_id' => $currency->id, 'status' => 'pending',
                'is_anonymous' => (bool) ($data['is_anonymous'] ?? false),
                'donor_name' => $data['donor_name'] ?? null, 'donor_email' => $data['donor_email'] ?? null,
                'donor_country' => $data['donor_country'] ?? null, 'message' => $data['message'] ?? null,
                'message_is_public' => (bool) ($data['message_is_public'] ?? false),
                'idempotency_key' => $data['idempotency_key'] ?? (string) Str::uuid(),
            ]);
            if ($donation->donation_type === 'recurring') {
                RecurringDonation::create(['donation_id' => $donation->id, 'user_id' => $userId, 'campaign_id' => $campaign->id,
                    'amount' => $donation->amount, 'currency_id' => $currency->id, 'frequency' => $data['frequency'] ?? 'monthly', 'status' => 'pending_gateway']);
            }
            $method = $data['payment_method'] ?? 'card';
            $record = $this->payments->findForMethod($method);
            if (!$record) {
                return ['donation' => $donation, 'payment' => ['state' => 'no_active_gateway', 'checkout_url' => null, 'provider_reference' => null,
                    'message' => 'Online payment is not yet activated for this method. Your donation intent was recorded as pending and no charge was made.'], 'duplicate' => false];
            }
            $txn = PaymentTransaction::create(['donation_id' => $donation->id, 'payment_provider_id' => $record->id, 'method' => $method,
                'amount' => $donation->amount, 'currency_id' => $currency->id, 'status' => 'initiated']);
            $result = $this->payments->providerFor($record)->initiate($donation, $method, $record);
            $txn->update(['provider_reference' => $result['provider_reference'] ?? null, 'status' => $result['state'] === 'requires_payment' ? 'pending' : 'initiated', 'raw_payload' => $result]);
            return ['donation' => $donation->fresh(), 'payment' => $result, 'duplicate' => false];
        });
    }
    /** Confirm only from a verified webhook / server-side verification. Issues receipt + notification log exactly once. */
    public function confirm(Donation $donation, ?PaymentTransaction $txn = null): Donation {
        return DB::transaction(function () use ($donation, $txn) {
            if ($donation->status !== 'confirmed') {
                $donation->update(['status' => 'confirmed', 'confirmed_at' => now()]);
                DonationReceipt::firstOrCreate(['donation_id' => $donation->id], ['receipt_number' => 'RCPT-' . $donation->reference, 'issued_at' => now()]);
                NotificationLog::firstOrCreate(['dedupe_key' => 'donation-confirmation-' . $donation->reference],
                    ['email' => $donation->donor_email, 'user_id' => $donation->user_id, 'template' => 'donation_confirmation', 'subject' => 'Your donation receipt ' . $donation->reference, 'status' => 'queued']);
            }
            if ($txn) $txn->update(['status' => 'succeeded', 'captured_at' => now(), 'net_amount' => bcsub((string) $txn->amount, (string) $txn->fee_amount, 2)]);
            return $donation->fresh();
        });
    }
}
