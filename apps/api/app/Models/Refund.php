<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Refund extends Model { protected $fillable=['donation_id','payment_transaction_id','amount','reason','status','requested_by','approved_by','processed_at']; protected $casts=['amount'=>'decimal:2','processed_at'=>'datetime']; }
