<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Publication extends Model {
    protected $fillable = ['slug','title','author','summary','body','category','topic','cover_image_url','file_url','is_featured','is_published','published_at','created_by'];
    protected $casts = ['is_featured' => 'boolean', 'is_published' => 'boolean', 'published_at' => 'datetime'];
    public function creator() { return $this->belongsTo(User::class, 'created_by'); }
    public function scopePublished($q) { return $q->where('is_published', true); }
}
