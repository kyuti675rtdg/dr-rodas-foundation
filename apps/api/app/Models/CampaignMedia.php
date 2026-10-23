<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CampaignMedia extends Model { protected $fillable=['campaign_id','url','caption','media_type','sort_order']; public function campaign(){return $this->belongsTo(Campaign::class);} }
