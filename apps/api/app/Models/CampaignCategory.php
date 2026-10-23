<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CampaignCategory extends Model { protected $fillable=['slug','name','description','is_active']; protected $casts=['is_active'=>'boolean']; public function campaigns(){return $this->hasMany(Campaign::class,'category_id');} }
