<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Program extends Model { protected $fillable=['campaign_id','name','description','beneficiary_description','eligibility','location','is_active']; protected $casts=['is_active'=>'boolean']; public function campaign(){return $this->belongsTo(Campaign::class);} }
