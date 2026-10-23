<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PaymentTransaction extends Model { protected $fillable=['donation_id','payment_provider_id','provider_reference','method','amount','currency_id','status','fee_amount','net_amount','authorized_at','captured_at','settled_at','raw_payload']; protected $casts=['amount'=>'decimal:2','fee_amount'=>'decimal:2','net_amount'=>'decimal:2','raw_payload'=>'array','captured_at'=>'datetime','settled_at'=>'datetime']; public function donation(){return $this->belongsTo(Donation::class);} }
