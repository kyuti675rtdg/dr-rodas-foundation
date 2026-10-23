<?php
namespace Database\Seeders;
use App\Models\{Campaign, CampaignCategory, Currency, PaymentProviderRecord, Permission, Role, User};
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder {
    public function run(): void {
        // DEVELOPMENT SEED ONLY — labelled seed data, never production financial records.
        $roles = ['super_admin' => 'Super Administrator', 'foundation_admin' => 'Foundation Administrator', 'finance_officer' => 'Finance Officer',
            'campaign_manager' => 'Campaign Manager', 'reviewer' => 'Authorized Reviewer', 'auditor' => 'Read-only Auditor', 'donor' => 'Donor'];
        foreach ($roles as $slug => $name) Role::firstOrCreate(['slug' => $slug], ['name' => $name]);
        foreach (['campaigns.manage','donations.view','finance.view','finance.approve','refunds.manage','users.manage','settings.manage','audit.view'] as $p)
            Permission::firstOrCreate(['slug' => $p], ['name' => ucwords(str_replace('.', ' ', $p))]);
        $usd = Currency::firstOrCreate(['code' => 'USD'], ['name' => 'US Dollar', 'symbol' => '$', 'is_reporting' => true]);
        Currency::firstOrCreate(['code' => 'ETB'], ['name' => 'Ethiopian Birr', 'symbol' => 'Br']);
        Currency::firstOrCreate(['code' => 'EUR'], ['name' => 'Euro', 'symbol' => '€']);
        Currency::firstOrCreate(['code' => 'GBP'], ['name' => 'Pound Sterling', 'symbol' => '£']);
        $cats = ['preservation' => 'Preservation & Restoration', 'exhibitions' => 'Exhibitions & Galleries', 'education' => 'Education & Learning',
            'collections' => 'Collections & Archives', 'community' => 'Community & Outreach', 'research' => 'Research', 'capital' => 'Capital Development'];
        foreach ($cats as $slug => $name) CampaignCategory::firstOrCreate(['slug' => $slug], ['name' => $name]);
        // Gateways seeded DISABLED. Enable only after docs/PAYMENT-SETUP-CHECKLIST.md is signed off.
        $gateways = [
            ['code' => 'stripe', 'name' => 'Stripe (cards & wallets)', 'methods' => ['card','visa','mastercard','apple_pay','google_pay','wechat_pay']],
            ['code' => 'telebirr', 'name' => 'Telebirr', 'methods' => ['telebirr']],
            ['code' => 'cbe_birr', 'name' => 'CBE Birr', 'methods' => ['cbe_birr']],
            ['code' => 'arifpay', 'name' => 'ArifPay', 'methods' => ['arifpay']],
        ];
        foreach ($gateways as $g) PaymentProviderRecord::firstOrCreate(['code' => $g['code']], ['name' => $g['name'], 'methods' => $g['methods'], 'mode' => 'test', 'is_enabled' => false]);
        $admin = User::firstOrCreate(['email' => env('SEED_ADMIN_EMAIL', 'admin@example.org')], ['name' => 'Foundation Admin (seed)', 'password' => Hash::make(env('SEED_ADMIN_PASSWORD', 'password'))]);
        if ($r = Role::where('slug', 'super_admin')->first()) $admin->roles()->syncWithoutDetaching([$r->id]);
        $seedCampaigns = [
            ['slug' => 'preserve-the-collection', 'title' => 'Preserve the Permanent Collection', 'category' => 'preservation', 'target' => 250000, 'featured' => true,
             'summary' => 'Conservation treatment, climate-safe storage and restoration for at-risk objects in the permanent collection.'],
            ['slug' => 'learning-lab-for-schools', 'title' => 'Learning Lab for Schools', 'category' => 'education', 'target' => 85000, 'featured' => true,
             'summary' => 'A hands-on learning lab giving school groups free access to history, art and science programs.'],
            ['slug' => 'digitize-the-archives', 'title' => 'Digitize the Archives', 'category' => 'collections', 'target' => 120000, 'featured' => false,
             'summary' => 'Digitizing photographs, manuscripts and recordings so the archive can be explored from anywhere.'],
        ];
        foreach ($seedCampaigns as $c) {
            Campaign::firstOrCreate(['slug' => $c['slug']], ['title' => $c['title'], 'summary' => $c['summary'],
                'description' => $c['summary'] . ' (Development seed description — replace with the foundation\'s verified campaign text before launch.)',
                'category_id' => CampaignCategory::where('slug', $c['category'])->first()?->id, 'target_amount' => $c['target'],
                'currency_id' => $usd->id, 'status' => 'published', 'is_featured' => $c['featured']]);
        }
    }
}
