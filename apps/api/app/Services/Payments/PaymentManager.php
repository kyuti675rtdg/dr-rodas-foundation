<?php
namespace App\Services\Payments;
use App\Models\PaymentProviderRecord;
use App\Services\Payments\Contracts\PaymentProvider;
class PaymentManager {
    public function providerFor(PaymentProviderRecord $record): PaymentProvider {
        return $record->code === 'stripe' ? app(StripePaymentProvider::class) : app(GenericHmacProvider::class);
    }
    /** A method is usable only if an enabled gateway row covers it AND (in production) credentials exist. */
    public function usableMethods(): array {
        $out = [];
        foreach (PaymentProviderRecord::where('is_enabled', true)->get() as $rec) {
            foreach (($rec->methods ?? []) as $m) $out[] = ['method' => $m, 'provider' => $rec->code, 'mode' => $rec->mode];
        }
        return $out;
    }
    public function findForMethod(string $method): ?PaymentProviderRecord {
        return PaymentProviderRecord::where('is_enabled', true)->get()->first(fn ($r) => in_array($method, $r->methods ?? [], true));
    }
}
