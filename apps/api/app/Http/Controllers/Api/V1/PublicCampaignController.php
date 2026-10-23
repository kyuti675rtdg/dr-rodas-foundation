<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\{Campaign, CampaignCategory, CampaignUpdate, Donation, FundDisbursement};
use App\Services\CampaignProgressService;
use App\Services\Payments\PaymentManager;
use Illuminate\Http\Request;
class PublicCampaignController extends Controller {
    public function __construct(private CampaignProgressService $progress, private PaymentManager $payments) {}
    public function index(Request $r) {
        $q = Campaign::with(['category','currency'])->where('status','published');
        if ($r->filled('category')) $q->whereHas('category', fn ($c) => $c->where('slug', $r->query('category')));
        if ($r->boolean('featured')) $q->where('is_featured', true);
        return response()->json(['data' => $q->orderByDesc('is_featured')->paginate(12)->through(fn ($c) => $this->progress->present($c))]);
    }
    public function show(string $slug) {
        $c = Campaign::with(['category','currency','media'])->where('slug',$slug)->where('status','published')->firstOrFail();
        $data = $this->progress->present($c);
        $data['updates'] = $c->updates()->where('is_published', true)->latest('published_at')->limit(10)->get(['id','title','body','published_at']);
        $data['recent_supporters'] = Donation::where('campaign_id',$c->id)->where('status','confirmed')->where('is_anonymous', false)->latest('confirmed_at')->limit(8)
            ->get(['donor_name','amount','currency_id','confirmed_at'])->map(fn ($d) => ['name' => $d->donor_name, 'amount' => $d->amount, 'confirmed_at' => $d->confirmed_at]);
        return response()->json(['data' => $data]);
    }
    public function categories() { return response()->json(['data' => CampaignCategory::where('is_active', true)->get(['id','slug','name','description'])]); }
    public function updates() { return response()->json(['data' => CampaignUpdate::with('campaign:id,title,slug')->where('is_published', true)->latest('published_at')->paginate(12)]); }
    public function paymentMethods() { return response()->json(['data' => $this->payments->usableMethods(), 'note' => 'Only verified, enabled gateways are listed. An empty list means online payment is not yet activated.']); }
    public function transparency() {
        $confirmed = Donation::where('status','confirmed');
        return response()->json(['data' => [
            'gross_confirmed_by_currency' => (clone $confirmed)->selectRaw('currency_id, SUM(amount) as total')->groupBy('currency_id')->get(),
            'fees' => \App\Models\PaymentTransaction::where('status','succeeded')->sum('fee_amount'),
            'refunds_total' => \App\Models\Refund::where('status','processed')->sum('amount'),
            'disbursed' => FundDisbursement::where('status','disbursed')->selectRaw('currency_id, SUM(amount) as total')->groupBy('currency_id')->get(),
            'campaigns' => Campaign::where('status','published')->with('currency')->get()->map(fn ($c) => $this->progress->present($c)),
            'note' => 'Gross confirmed donations are not the same as available cash; disbursed amounts require finance preparation and admin approval.',
        ]]);
    }
}
