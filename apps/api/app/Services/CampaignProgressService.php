<?php
namespace App\Services;
use App\Models\Campaign;
use App\Models\Donation;
class CampaignProgressService {
    /** Progress counts CONFIRMED donations only, in the campaign's own currency rows are stored per-donation; totals are grouped by currency to avoid mixing currencies. */
    public function raisedFor(Campaign $campaign, ?int $currencyId = null): string {
        $q = Donation::where('campaign_id', $campaign->id)->where('status', 'confirmed');
        if ($currencyId) $q->where('currency_id', $currencyId); else $q->where('currency_id', $campaign->currency_id);
        return number_format((float) $q->sum('amount'), 2, '.', '');
    }
    public function donorCount(Campaign $campaign): int {
        return Donation::where('campaign_id', $campaign->id)->where('status','confirmed')->distinct('donor_email')->count('donor_email');
    }
    public function present(Campaign $campaign): array {
        $raised = $this->raisedFor($campaign);
        $target = (float) $campaign->target_amount;
        return [
            'id' => $campaign->id, 'slug' => $campaign->slug, 'title' => $campaign->title,
            'summary' => $campaign->summary, 'description' => $campaign->description, 'purpose' => $campaign->purpose,
            'category' => $campaign->category?->slug, 'category_name' => $campaign->category?->name,
            'target_amount' => number_format($target, 2, '.', ''), 'raised_amount' => $raised,
            'progress_percent' => $target > 0 ? min(100, round(((float)$raised / $target) * 100, 1)) : 0,
            'donor_count' => $this->donorCount($campaign),
            'currency' => $campaign->currency?->code, 'status' => $campaign->status,
            'deadline' => $campaign->deadline?->toDateString(), 'is_featured' => (bool) $campaign->is_featured,
            'cover_image_url' => $campaign->cover_image_url,
        ];
    }
}
