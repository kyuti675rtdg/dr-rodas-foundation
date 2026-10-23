<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Models\{AuditLog, NewsArticle, Publication};
use Illuminate\Http\Request;
use Illuminate\Support\Str;
// Admin CRUD basics for publications + news. Unpublishing is the archive path:
// content is never hard-deleted so the public record stays auditable.
class ContentAdminController extends Controller {
    public function publications() { return response()->json(['data' => Publication::latest()->paginate(20)]); }
    public function storePublication(Request $r) {
        $d = $r->validate(['title' => 'required|string|max:200', 'author' => 'nullable|string|max:200', 'summary' => 'nullable|string|max:500',
            'body' => 'nullable|string', 'category' => 'nullable|string|max:120', 'topic' => 'nullable|string|max:120',
            'cover_image_url' => 'nullable|string|max:500', 'file_url' => 'nullable|string|max:500',
            'is_featured' => 'nullable|boolean', 'is_published' => 'nullable|boolean']);
        $d['slug'] = Str::slug($d['title']) . '-' . Str::lower(Str::random(5));
        $d['created_by'] = $r->user()->id;
        $d['published_at'] = !empty($d['is_published']) ? now() : null;
        $p = Publication::create($d);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'publication.created', 'auditable_type' => Publication::class, 'auditable_id' => $p->id, 'new_values' => $p->toArray(), 'ip_address' => $r->ip()]);
        return response()->json(['data' => $p], 201);
    }
    public function updatePublication(Request $r, Publication $publication) {
        $old = $publication->toArray();
        $d = $r->validate(['title' => 'sometimes|string|max:200', 'author' => 'nullable|string|max:200', 'summary' => 'nullable|string|max:500',
            'body' => 'nullable|string', 'category' => 'nullable|string|max:120', 'topic' => 'nullable|string|max:120',
            'cover_image_url' => 'nullable|string|max:500', 'file_url' => 'nullable|string|max:500',
            'is_featured' => 'nullable|boolean', 'is_published' => 'nullable|boolean']);
        if (array_key_exists('is_published', $d)) $d['published_at'] = !empty($d['is_published']) ? ($publication->published_at ?? now()) : null;
        $publication->update($d);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'publication.updated', 'auditable_type' => Publication::class, 'auditable_id' => $publication->id, 'old_values' => $old, 'new_values' => $publication->fresh()->toArray(), 'ip_address' => $r->ip()]);
        return response()->json(['data' => $publication->fresh()]);
    }
    public function destroyPublication(Request $r, Publication $publication) {
        $publication->update(['is_published' => false, 'published_at' => null]);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'publication.unpublished', 'auditable_type' => Publication::class, 'auditable_id' => $publication->id, 'ip_address' => $r->ip()]);
        return response()->json(['message' => 'Publication unpublished (archived).']);
    }
    public function news() { return response()->json(['data' => NewsArticle::latest()->paginate(20)]); }
    public function storeNews(Request $r) {
        $d = $r->validate(['title' => 'required|string|max:200', 'subtitle' => 'nullable|string|max:300', 'author' => 'nullable|string|max:200',
            'summary' => 'nullable|string|max:500', 'body' => 'required|string', 'category' => 'nullable|string|max:120',
            'featured_image_url' => 'nullable|string|max:500', 'featured_image_alt' => 'nullable|string|max:300',
            'is_featured' => 'nullable|boolean', 'is_published' => 'nullable|boolean']);
        $d['slug'] = Str::slug($d['title']) . '-' . Str::lower(Str::random(5));
        $d['author_id'] = $r->user()->id;
        $d['published_at'] = !empty($d['is_published']) ? now() : null;
        $a = NewsArticle::create($d);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'news.created', 'auditable_type' => NewsArticle::class, 'auditable_id' => $a->id, 'new_values' => $a->toArray(), 'ip_address' => $r->ip()]);
        return response()->json(['data' => $a], 201);
    }
    public function updateNews(Request $r, NewsArticle $newsArticle) {
        $old = $newsArticle->toArray();
        $d = $r->validate(['title' => 'sometimes|string|max:200', 'subtitle' => 'nullable|string|max:300', 'author' => 'nullable|string|max:200',
            'summary' => 'nullable|string|max:500', 'body' => 'sometimes|string', 'category' => 'nullable|string|max:120',
            'featured_image_url' => 'nullable|string|max:500', 'featured_image_alt' => 'nullable|string|max:300',
            'is_featured' => 'nullable|boolean', 'is_published' => 'nullable|boolean']);
        if (array_key_exists('is_published', $d)) $d['published_at'] = !empty($d['is_published']) ? ($newsArticle->published_at ?? now()) : null;
        $newsArticle->update($d);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'news.updated', 'auditable_type' => NewsArticle::class, 'auditable_id' => $newsArticle->id, 'old_values' => $old, 'new_values' => $newsArticle->fresh()->toArray(), 'ip_address' => $r->ip()]);
        return response()->json(['data' => $newsArticle->fresh()]);
    }
    public function destroyNews(Request $r, NewsArticle $newsArticle) {
        $newsArticle->update(['is_published' => false, 'published_at' => null]);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'news.unpublished', 'auditable_type' => NewsArticle::class, 'auditable_id' => $newsArticle->id, 'ip_address' => $r->ip()]);
        return response()->json(['message' => 'News article unpublished (archived).']);
    }
}
