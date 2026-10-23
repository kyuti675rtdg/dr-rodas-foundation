<?php
namespace App\Services\Payments\Contracts;
use App\Models\Donation;
use App\Models\PaymentProviderRecord;
interface PaymentProvider {
    /** @return array{state:string, checkout_url:?string, provider_reference:?string, message:?string} */
    public function initiate(Donation $donation, string $method, PaymentProviderRecord $record): array;
    public function verifyWebhookSignature(string $rawBody, ?string $signature, PaymentProviderRecord $record): bool;
}
