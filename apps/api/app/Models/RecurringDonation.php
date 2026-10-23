<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class RecurringDonation extends Model { protected $fillable=['donation_id','user_id','campaign_id','amount','currency_id','frequency','status','provider_subscription_ref','next_charge_at']; protected $casts=['amount'=>'decimal:2','next_charge_at'=>'date']; }
