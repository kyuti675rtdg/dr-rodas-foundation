<?php
namespace Tests\Feature;
use App\Models\{Campaign, Currency, Donation, PaymentProviderRecord, Role, User};
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
class FoundationPlatformTest extends TestCase {
    use RefreshDatabase;
    protected function setUp(): void { parent::setUp(); $this->seed(DatabaseSeeder::class); }
    private function campaign(): Campaign { return Campaign::where('slug', 'preserve-the-collection')->firstOrFail(); }

    public function test_public_campaigns_list_with_zero_progress_when_no_confirmed_donations(): void {
        $this->getJson('/api/v1/campaigns')->assertOk()->assertJsonPath('data.data.0.raised_amount', '0.00');
    }
    public function test_pending_donation_does_not_count_and_duplicate_idempotency_is_prevented(): void {
        $payload = ['campaign_id' => $this->campaign()->id, 'amount' => 500, 'currency' => 'USD', 'donor_email' => 'a@example.org', 'idempotency_key' => 'key-1'];
        $this->postJson('/api/v1/donations', $payload)->assertCreated()->assertJsonPath('data.payment.state', 'no_active_gateway');
        $this->postJson('/api/v1/donations', $payload)->assertOk()->assertJsonPath('data.duplicate', true);
        $this->assertEquals(1, Donation::count());
        $this->getJson('/api/v1/campaigns/preserve-the-collection')->assertOk()->assertJsonPath('data.raised_amount', '0.00');
    }
    public function test_signed_webhook_confirms_donation_once_and_duplicate_event_is_acknowledged(): void {
        $gateway = PaymentProviderRecord::where('code', 'telebirr')->firstOrFail();
        $gateway->update(['is_enabled' => true, 'config' => ['webhook_secret' => 'test-secret']]);
        config(['services.payments.webhook_secret' => 'test-secret']);
        $don = Donation::create(['reference' => 'DRF-TEST-1', 'campaign_id' => $this->campaign()->id, 'amount' => 250, 'currency_id' => Currency::where('code','USD')->first()->id,
            'status' => 'pending', 'donor_email' => 'donor@example.org', 'idempotency_key' => 'wh-1']);
        $body = json_encode(['id' => 'evt_1', 'type' => 'payment.succeeded', 'data' => ['donation_reference' => 'DRF-TEST-1', 'amount' => 250]]);
        $sig = hash_hmac('sha256', $body, 'test-secret');
        $this->call('POST', '/api/v1/webhooks/telebirr', [], [], [], ['HTTP_X-Signature' => $sig, 'CONTENT_TYPE' => 'application/json'], $body)->assertOk();
        $this->assertEquals('confirmed', $don->fresh()->status);
        $this->assertNotNull($don->fresh()->receipt);
        // duplicate delivery
        $this->call('POST', '/api/v1/webhooks/telebirr', [], [], [], ['HTTP_X-Signature' => $sig, 'CONTENT_TYPE' => 'application/json'], $body)->assertOk()->assertJsonPath('message', 'Duplicate event acknowledged.');
        $this->getJson('/api/v1/campaigns/preserve-the-collection')->assertOk()->assertJsonPath('data.raised_amount', '250.00');
        // bad signature must not confirm a second donation
        $don2 = Donation::create(['reference' => 'DRF-TEST-2', 'campaign_id' => $this->campaign()->id, 'amount' => 999, 'currency_id' => $don->currency_id, 'status' => 'pending', 'idempotency_key' => 'wh-2']);
        $body2 = json_encode(['id' => 'evt_2', 'type' => 'payment.succeeded', 'data' => ['donation_reference' => 'DRF-TEST-2', 'amount' => 999]]);
        $this->call('POST', '/api/v1/webhooks/telebirr', [], [], [], ['HTTP_X-Signature' => 'bad', 'CONTENT_TYPE' => 'application/json'], $body2)->assertStatus(400);
        $this->assertEquals('pending', $don2->fresh()->status);
    }
    public function test_rbac_donor_cannot_create_campaign_but_manager_can(): void {
        $donor = User::create(['name' => 'Donor', 'email' => 'd@example.org', 'password' => Hash::make('password')]);
        $donor->roles()->attach(Role::where('slug', 'donor')->first()->id);
        $usd = Currency::where('code', 'USD')->first();
        $this->actingAs($donor, 'sanctum')->postJson('/api/v1/admin/campaigns', ['title' => 'Nope', 'target_amount' => 100, 'currency_id' => $usd->id])->assertForbidden();
        $mgr = User::create(['name' => 'Manager', 'email' => 'm@example.org', 'password' => Hash::make('password')]);
        $mgr->roles()->attach(Role::where('slug', 'campaign_manager')->first()->id);
        $this->actingAs($mgr, 'sanctum')->postJson('/api/v1/admin/campaigns', ['title' => 'New Gallery Wing', 'target_amount' => 1000, 'currency_id' => $usd->id])->assertCreated();
    }
    public function test_invalid_designation_is_rejected_no_religious_categories(): void {
        $this->postJson('/api/v1/donations', ['campaign_id' => $this->campaign()->id, 'amount' => 10, 'designation' => 'zakat'])->assertUnprocessable();
    }
}
