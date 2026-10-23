<?php
namespace App\Services\Payments;
use App\Models\Donation;
use App\Models\PaymentProviderRecord;
use App\Services\Payments\Contracts\PaymentProvider;
/** Visa, Mastercard, Apple Pay, Google Pay and WeChat Pay are all processed through Stripe where the
 *  foundation's entity is eligible. Inert until STRIPE_SECRET is configured AND the gateway row is enabled. */
class StripePaymentProvider implements PaymentProvider {
    public function initiate(Donation $donation, string $method, PaymentProviderRecord $record): array {
        $secret = config('services.stripe.secret');
        if (!$secret) return ['state' => 'gateway_not_configured', 'checkout_url' => null, 'provider_reference' => null, 'message' => 'Card payments are not yet activated for this foundation. No charge was made.'];
        // Production path: create a Stripe Checkout Session via the official API using $secret,
        // with metadata donation_reference + idempotency key = $donation->idempotency_key.
        // Intentionally not faked here: a session is only created against a verified merchant account.
        return ['state' => 'gateway_not_configured', 'checkout_url' => null, 'provider_reference' => null, 'message' => 'Stripe Checkout session creation requires the verified merchant configuration step in docs/PAYMENT-SETUP-CHECKLIST.md.'];
    }
    public function verifyWebhookSignature(string $rawBody, ?string $signature, PaymentProviderRecord $record): bool {
        $secret = config('services.stripe.webhook_secret');
        if (!$secret || !$signature) return false;
        // Stripe sends t=...,v1=... ; for other adapters we accept a plain HMAC hex (used by tests + Ethiopian adapters).
        if (str_contains($signature, 'v1=')) {
            $parts = []; foreach (explode(',', $signature) as $kv) { [$k, $v] = array_pad(explode('=', $kv, 2), 2, ''); $parts[$k] = $v; }
            if (!isset($parts['t'], $parts['v1'])) return false;
            $expected = hash_hmac('sha256', $parts['t'] . '.' . $rawBody, $secret);
            return hash_equals($expected, $parts['v1']);
        }
        return hash_equals(hash_hmac('sha256', $rawBody, $secret), $signature);
    }
}
