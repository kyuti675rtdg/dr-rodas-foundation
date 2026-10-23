<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DonorProfile extends Model { protected $fillable=['user_id','full_name','email','phone','country','public_recognition','marketing_opt_in','updates_opt_in']; protected $casts=['public_recognition'=>'boolean','marketing_opt_in'=>'boolean','updates_opt_in'=>'boolean']; public function user(){return $this->belongsTo(User::class);} public function donations(){return $this->hasMany(Donation::class);} }
