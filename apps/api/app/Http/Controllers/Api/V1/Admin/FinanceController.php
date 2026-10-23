<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Models\{AuditLog, Donation, FinancialApproval, FundDisbursement, PaymentTransaction, Refund};
use Illuminate\Http\Request;
class FinanceController extends Controller {
    public function summary() {
        return response()->json(['data' => [
            'confirmed_donations' => Donation::where('status','confirmed')->count(),
            'gross_by_currency' => Donation::where('status','confirmed')->selectRaw('currency_id, SUM(amount) total')->groupBy('currency_id')->get(),
            'pending_donations' => Donation::where('status','pending')->count(),
            'fees_total' => PaymentTransaction::where('status','succeeded')->sum('fee_amount'),
            'refunds_total' => Refund::where('status','processed')->sum('amount'),
            'disbursed_total' => FundDisbursement::where('status','disbursed')->sum('amount'),
            'awaiting_approval' => FundDisbursement::where('status','pending_approval')->count(),
        ]]);
    }
    public function donations(Request $r) { return response()->json(['data' => Donation::with('campaign:id,title')->latest()->paginate(25)]); }
    public function storeDisbursement(Request $r) {
        $d = $r->validate(['campaign_id' => 'required|exists:campaigns,id', 'program_id' => 'nullable|exists:programs,id', 'amount' => 'required|numeric|min:1',
            'currency_id' => 'required|exists:currencies,id', 'purpose' => 'required|string|max:255', 'supporting_document_url' => 'nullable|string|max:500']);
        $d['prepared_by'] = $r->user()->id; $d['status'] = 'pending_approval';
        $f = FundDisbursement::create($d);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'disbursement.prepared', 'auditable_type' => FundDisbursement::class, 'auditable_id' => $f->id, 'new_values' => $f->toArray(), 'ip_address' => $r->ip()]);
        return response()->json(['data' => $f], 201);
    }
    public function approveDisbursement(Request $r, FundDisbursement $disbursement) {
        $d = $r->validate(['decision' => 'required|in:approved,rejected', 'notes' => 'nullable|string']);
        FinancialApproval::create(['approvable_type' => FundDisbursement::class, 'approvable_id' => $disbursement->id, 'approver_id' => $r->user()->id, 'decision' => $d['decision'], 'notes' => $d['notes'] ?? null, 'decided_at' => now()]);
        $disbursement->update(['status' => $d['decision'] === 'approved' ? 'approved' : 'rejected', 'approved_by' => $r->user()->id]);
        AuditLog::create(['user_id' => $r->user()->id, 'action' => 'disbursement.' . $d['decision'], 'auditable_type' => FundDisbursement::class, 'auditable_id' => $disbursement->id, 'ip_address' => $r->ip()]);
        return response()->json(['data' => $disbursement->fresh()]);
    }
    public function auditLogs() { return response()->json(['data' => AuditLog::latest()->paginate(50)]); }
}
