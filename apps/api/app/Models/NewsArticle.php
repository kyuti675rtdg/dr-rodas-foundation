<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class NewsArticle extends Model {
    protected $fillable = ['slug','title','subtitle','author','summary','body','category','featured_image_url','featured_image_alt','is_featured','is_published','published_at','author_id'];
    protected $casts = ['is_featured' => 'boolean', 'is_published' => 'boolean', 'published_at' => 'datetime'];
    public function authorUser() { return $this->belongsTo(User::class, 'author_id'); }
    public function scopePublished($q) { return $q->where('is_published', true); }
}
