<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PaymentProviderRecord extends Model { protected $table='payment_providers'; protected $fillable=['code','name','methods','mode','is_enabled','config']; protected $casts=['methods'=>'array','config'=>'array','is_enabled'=>'boolean']; }
