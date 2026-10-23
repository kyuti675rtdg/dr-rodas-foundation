<?php
namespace Tests\Feature;
use App\Models\{NewsArticle, Publication, Role, User};
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
class ContentApiTest extends TestCase {
    use RefreshDatabase;
    protected function setUp(): void { parent::setUp(); $this->seed(DatabaseSeeder::class); }

    public function test_publications_endpoint_returns_published_only(): void {
        Publication::create(['slug' => 'pub-live', 'title' => 'Published Work', 'category' => 'Manuscripts', 'is_published' => true, 'published_at' => now()]);
        Publication::create(['slug' => 'pub-draft', 'title' => 'Draft Work', 'category' => 'Manuscripts', 'is_published' => false]);
        $this->getJson('/api/v1/publications')->assertOk()
            ->assertJsonCount(1, 'data.data')
            ->assertJsonPath('data.data.0.slug', 'pub-live');
        $this->getJson('/api/v1/publications/pub-live')->assertOk()->assertJsonPath('data.title', 'Published Work');
        $this->getJson('/api/v1/publications/pub-draft')->assertNotFound();
        // seed publication placeholder is a draft — must not leak to the public
        $this->getJson('/api/v1/publications/seed-geez-language-studies')->assertNotFound();
    }

    public function test_news_endpoint_returns_published_only(): void {
        NewsArticle::create(['slug' => 'news-live', 'title' => 'Published Story', 'body' => 'Body', 'category' => 'Foundation Announcements', 'is_published' => true, 'published_at' => now()]);
        NewsArticle::create(['slug' => 'news-draft', 'title' => 'Draft Story', 'body' => 'Body', 'category' => 'Foundation Announcements', 'is_published' => false]);
        $res = $this->getJson('/api/v1/news')->assertOk();
        $slugs = collect($res->json('data.data'))->pluck('slug');
        $this->assertTrue($slugs->contains('news-live'));
        $this->assertFalse($slugs->contains('news-draft'));
        $this->getJson('/api/v1/news/news-live')->assertOk()->assertJsonPath('data.title', 'Published Story');
        $this->getJson('/api/v1/news/news-draft')->assertNotFound();
    }

    public function test_admin_content_crud_requires_content_role(): void {
        $donor = User::create(['name' => 'Donor', 'email' => 'cd@example.org', 'password' => Hash::make('password')]);
        $donor->roles()->attach(Role::where('slug', 'donor')->first()->id);
        $this->actingAs($donor, 'sanctum')->postJson('/api/v1/admin/publications', ['title' => 'Nope'])->assertForbidden();
        $this->actingAs($donor, 'sanctum')->postJson('/api/v1/admin/news', ['title' => 'Nope', 'body' => 'x'])->assertForbidden();

        $mgr = User::create(['name' => 'Manager', 'email' => 'cm@example.org', 'password' => Hash::make('password')]);
        $mgr->roles()->attach(Role::where('slug', 'campaign_manager')->first()->id);
        $this->actingAs($mgr, 'sanctum')->postJson('/api/v1/admin/publications', ['title' => 'Approved Study', 'category' => 'Astronomy & Calendars', 'is_published' => true])
            ->assertCreated()->assertJsonPath('data.is_published', true);
        $pubId = Publication::where('title', 'Approved Study')->firstOrFail()->id;
        // unpublish (archive) removes it from the public endpoint
        $slug = Publication::findOrFail($pubId)->slug;
        $this->actingAs($mgr, 'sanctum')->deleteJson("/api/v1/admin/publications/{$pubId}")->assertOk();
        $this->getJson("/api/v1/publications/{$slug}")->assertNotFound();

        $this->actingAs($mgr, 'sanctum')->postJson('/api/v1/admin/news', ['title' => 'Real Update', 'body' => 'Verified body', 'category' => 'Museum Project Updates', 'is_published' => true])
            ->assertCreated()->assertJsonPath('data.is_published', true);
    }
}
