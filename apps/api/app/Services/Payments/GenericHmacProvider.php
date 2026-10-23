<?php
namespace App\Services\Payments;
use App\Models\Donation;
use App\Models\PaymentProviderRecord;
use App\Services\Payments\Contracts\PaymentProvider;
/** Shared adapter for Telebirr / CBE Birr / ArifPay style gateways: HMAC-signed callbacks.
 *  Initiation returns awaiting_gateway until the operator merchant agreement + credentials exist. */
class GenericHmacProvider implements PaymentProvider {
    public function initiate(Donation $donation, string $method, PaymentProviderRecord $record): array {
        return ['state' => 'gateway_not_configured', 'checkout_url' => null, 'provider_reference' => null, 'message' => 'This payment method is not yet activated. No charge was made.'];
    }
    public function verifyWebhookSignature(string $rawBody, ?string $signature, PaymentProviderRecord $record): bool {
        $secret = $record->config['webhook_secret'] ?? config('services.payments.webhook_secret');
        if (!$secret || !$signature) return false;
        return hash_equals(hash_hmac('sha256', $rawBody, $secret), $signature);
    }
}
