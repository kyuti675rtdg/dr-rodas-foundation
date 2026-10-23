<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\RecurringDonation;
use Illuminate\Http\Request;
class DonorController extends Controller {
    public function profile(Request $r) { return response()->json(['data' => $r->user()->donorProfile]); }
    public function updateProfile(Request $r) {
        $d = $r->validate(['full_name' => 'sometimes|string|max:160', 'phone' => 'nullable|string|max:40', 'country' => 'nullable|string|max:80',
            'public_recognition' => 'nullable|boolean', 'marketing_opt_in' => 'nullable|boolean', 'updates_opt_in' => 'nullable|boolean']);
        $p = $r->user()->donorProfile()->firstOrCreate(['email' => $r->user()->email], ['full_name' => $r->user()->name]);
        $p->update($d); return response()->json(['data' => $p->fresh()]);
    }
    public function recurring(Request $r) { return response()->json(['data' => RecurringDonation::where('user_id', $r->user()->id)->latest()->get()]); }
    public function cancelRecurring(Request $r, RecurringDonation $recurring) {
        abort_unless($recurring->user_id === $r->user()->id || $r->user()->hasAnyRole(['foundation_admin']), 403);
        $recurring->update(['status' => 'cancelled']); return response()->json(['data' => $recurring->fresh()]);
    }
}
