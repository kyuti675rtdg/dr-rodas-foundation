<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PaymentWebhookEvent extends Model { protected $fillable=['payment_provider_id','provider_event_id','event_type','payload','signature_valid','processed_at','processing_error']; protected $casts=['payload'=>'array','signature_valid'=>'boolean','processed_at'=>'datetime']; }
