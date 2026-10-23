<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\{NewsArticle, Publication};
use Illuminate\Http\Request;
// Public content endpoints — PUBLISHED items only. Drafts / unpublished items
// are never exposed here (enforced by the published() scope, covered by tests).
class PublicContentController extends Controller {
    public function publications(Request $r) {
        $q = Publication::published();
        if ($r->filled('category')) $q->where('category', $r->query('category'));
        if ($r->filled('topic')) $q->where('topic', $r->query('topic'));
        if ($r->boolean('featured')) $q->where('is_featured', true);
        if ($r->filled('q')) {
            $term = '%' . $r->query('q') . '%';
            $q->where(fn ($w) => $w->where('title', 'like', $term)->orWhere('author', 'like', $term)->orWhere('topic', 'like', $term)->orWhere('summary', 'like', $term));
        }
        return response()->json(['data' => $q->orderByDesc('is_featured')->latest('published_at')->paginate(12)]);
    }
    public function publication(string $slug) {
        return response()->json(['data' => Publication::published()->where('slug', $slug)->firstOrFail()]);
    }
    public function news(Request $r) {
        $q = NewsArticle::published();
        if ($r->filled('category')) $q->where('category', $r->query('category'));
        if ($r->boolean('featured')) $q->where('is_featured', true);
        if ($r->filled('q')) {
            $term = '%' . $r->query('q') . '%';
            $q->where(fn ($w) => $w->where('title', 'like', $term)->orWhere('subtitle', 'like', $term)->orWhere('summary', 'like', $term)->orWhere('author', 'like', $term));
        }
        return response()->json(['data' => $q->orderByDesc('is_featured')->latest('published_at')->paginate(12)]);
    }
    public function newsArticle(string $slug) {
        return response()->json(['data' => NewsArticle::published()->where('slug', $slug)->firstOrFail()]);
    }
}
