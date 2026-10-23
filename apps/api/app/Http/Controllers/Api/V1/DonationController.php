<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Services\DonationService;
use Illuminate\Http\Request;
class DonationController extends Controller {
    public function __construct(private DonationService $donations) {}
    public function store(Request $r) {
        $d = $r->validate([
            'campaign_id' => 'required|exists:campaigns,id', 'amount' => 'required|numeric|min:1|max:10000000',
            'currency' => 'nullable|string|size:3', 'designation' => 'nullable|in:general,preservation,exhibitions,education,collections,community,research,capital',
            'donation_type' => 'nullable|in:one_time,recurring', 'frequency' => 'nullable|in:monthly,quarterly,annually',
            'payment_method' => 'nullable|in:card,visa,mastercard,wechat_pay,apple_pay,google_pay,telebirr,cbe_birr,arifpay',
            'donor_name' => 'nullable|string|max:160', 'donor_email' => 'nullable|email|max:190', 'donor_country' => 'nullable|string|max:80',
            'is_anonymous' => 'nullable|boolean', 'message' => 'nullable|string|max:1000', 'message_is_public' => 'nullable|boolean',
            'idempotency_key' => 'nullable|string|max:80',
        ]);
        $result = $this->donations->initiate($d, $r->user()?->id);
        $don = $result['donation'];
        return response()->json(['data' => ['reference' => $don->reference, 'status' => $don->status, 'amount' => $don->amount,
            'payment' => $result['payment'], 'duplicate' => $result['duplicate']]], $result['duplicate'] ? 200 : 201);
    }
    public function show(string $reference) {
        $don = Donation::with(['campaign:id,title,slug','receipt'])->where('reference', $reference)->firstOrFail();
        return response()->json(['data' => ['reference' => $don->reference, 'status' => $don->status, 'amount' => $don->amount,
            'campaign' => $don->campaign?->title, 'confirmed_at' => $don->confirmed_at, 'receipt_number' => $don->receipt?->receipt_number]]);
    }
    public function history(Request $r) {
        return response()->json(['data' => Donation::with('campaign:id,title,slug')->where('user_id', $r->user()->id)->latest()->paginate(20)]);
    }
}
