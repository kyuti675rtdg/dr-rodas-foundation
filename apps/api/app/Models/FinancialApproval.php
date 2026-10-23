<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class FinancialApproval extends Model { protected $fillable=['approvable_type','approvable_id','approver_id','decision','notes','decided_at']; protected $casts=['decided_at'=>'datetime']; }
