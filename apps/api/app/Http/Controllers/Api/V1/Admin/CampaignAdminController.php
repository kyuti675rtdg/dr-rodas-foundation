<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Models\{AuditLog, Campaign, CampaignUpdate};
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class CampaignAdminController extends Controller {
    public function index() { return response()->json(['data' => Campaign::with('currency')->latest()->paginate(20)]); }
    public function store(Request $r) {
        $d = $r->validate(['title' => 'required|string|max:200', 'category_id' => 'nullable|exists:campaign_categories,id', 'summary' => 'nullable|string|max:500',
            'description' => 'nullable|string', 'purpose' => 'nullable|string|max:200', 'target_amount' => 'required|numeric|min:0', 'currency_id' => 'required|exists:currencies,id',
            'status' => 'nullable|in:draft,published,paused,closed,archived', 'deadline' => 'nullable|date', 'is_featured' => 'nullable|boolean', 'cover_image_url' => 'nullable|string|max:500']);
        $d['slug'] = Str::slug($d['title']) . '-' . Str::lower(Str::random(5)); $d['manager_id'] = $r->user()->id;
        $c = Campaign::create($d);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'campaign.created', 'auditable_type' => Campaign::class, 'auditable_id' => $c->id, 'new_values' => $c->toArray(), 'ip_address' => $r->ip()]);
        return response()->json(['data' => $c], 201);
    }
    public function update(Request $r, Campaign $campaign) {
        $old = $campaign->toArray();
        $d = $r->validate(['title' => 'sometimes|string|max:200', 'category_id' => 'nullable|exists:campaign_categories,id', 'summary' => 'nullable|string|max:500', 'description' => 'nullable|string',
            'purpose' => 'nullable|string|max:200', 'target_amount' => 'sometimes|numeric|min:0', 'status' => 'sometimes|in:draft,published,paused,closed,archived', 'deadline' => 'nullable|date', 'is_featured' => 'nullable|boolean']);
        $campaign->update($d);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'campaign.updated', 'auditable_type' => Campaign::class, 'auditable_id' => $campaign->id, 'old_values' => $old, 'new_values' => $campaign->fresh()->toArray(), 'ip_address' => $r->ip()]);
        return response()->json(['data' => $campaign->fresh()]);
    }
    public function storeUpdate(Request $r, Campaign $campaign) {
        $d = $r->validate(['title' => 'required|string|max:200', 'body' => 'required|string', 'is_published' => 'nullable|boolean']);
        $u = CampaignUpdate::create(['campaign_id' => $campaign->id, 'author_id' => $r->user()->id, 'title' => $d['title'], 'body' => $d['body'],
            'is_published' => (bool) ($d['is_published'] ?? false), 'published_at' => !empty($d['is_published']) ? now() : null]);
        return response()->json(['data' => $u], 201);
    }
    public function destroy(Request $r, Campaign $campaign) {
        $campaign->update(['status' => 'archived']); // campaigns are archived, never hard-deleted (financial history)
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'campaign.archived', 'auditable_type' => Campaign::class, 'auditable_id' => $campaign->id, 'ip_address' => $r->ip()]);
        return response()->json(['message' => 'Campaign archived.']);
    }
}
