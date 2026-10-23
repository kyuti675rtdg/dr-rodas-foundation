<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class FundDisbursement extends Model { protected $fillable=['campaign_id','program_id','amount','currency_id','purpose','status','prepared_by','approved_by','disbursed_at','supporting_document_url']; protected $casts=['amount'=>'decimal:2','disbursed_at'=>'datetime']; }
