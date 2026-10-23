<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class NotificationLog extends Model { protected $fillable=['user_id','email','channel','template','subject','status','sent_at','failure_reason','dedupe_key']; protected $casts=['sent_at'=>'datetime']; }
