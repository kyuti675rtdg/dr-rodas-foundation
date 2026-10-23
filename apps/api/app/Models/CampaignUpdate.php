<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CampaignUpdate extends Model { protected $fillable=['campaign_id','author_id','title','body','is_published','published_at']; protected $casts=['is_published'=>'boolean','published_at'=>'datetime']; public function campaign(){return $this->belongsTo(Campaign::class);} }
