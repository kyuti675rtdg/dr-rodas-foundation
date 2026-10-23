<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DonationAllocation extends Model { protected $fillable=['donation_id','program_id','category_slug','amount','notes']; protected $casts=['amount'=>'decimal:2']; }
