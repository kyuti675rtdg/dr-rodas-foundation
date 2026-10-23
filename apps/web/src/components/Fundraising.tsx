import { FUNDING_CATEGORIES, LAST_VERIFIED_UPDATE, money } from "@/lib/data";
import { ProgressBar } from "@/components/CampaignCard";

export function totals() {
  const target = FUNDING_CATEGORIES.reduce((s, c) => s + c.target, 0);
  const raised = FUNDING_CATEGORIES.reduce((s, c) => s + c.raised, 0);
  return { target, raised, remaining: target - raised, pct: target > 0 ? Math.round((raised / target) * 1000) / 10 : 0 };
}

export function FundraisingSummary() {
  const t = totals();
  return (
    <section aria-label="Fundraising summary" className="rounded-3xl border border-mist bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-serif text-2xl font-semibold text-navy">Museum fundraising summary</h2>
        <span className="rounded-full bg-ivory px-3 py-1 text-xs font-semibold text-gold-dark">Confirmed donations only</span>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
        <div><dt className="text-xs uppercase tracking-widest text-neutral-500">Fundraising target</dt><dd className="mt-1 font-serif text-3xl font-semibold text-navy">{money(t.target)}</dd></div>
        <div><dt className="text-xs uppercase tracking-widest text-neutral-500">Verified raised</dt><dd className="mt-1 font-serif text-3xl font-semibold text-navy">{money(t.raised)}</dd></div>
        <div><dt className="text-xs uppercase tracking-widest text-neutral-500">Remaining</dt><dd className="mt-1 font-serif text-3xl font-semibold text-navy">{money(t.remaining)}</dd></div>
        <div><dt className="text-xs uppercase tracking-widest text-neutral-500">Completed</dt><dd className="mt-1 font-serif text-3xl font-semibold text-navy">{t.pct}%</dd></div>
      </dl>
      <div className="mt-5"><ProgressBar value={t.pct} /></div>
      <p className="mt-4 text-xs leading-5 text-neutral-500">Last verified update: {LAST_VERIFIED_UPDATE} Targets below are proposed seed figures pending foundation approval; live totals come only from server-verified, confirmed donations.</p>
    </section>
  );
}

export function CategoriesTable() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-mist bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Donation targets and progress by funding category</caption>
        <thead className="bg-ivory text-neutral-500"><tr>
          <th className="px-5 py-3 font-semibold">Funding Category</th><th className="px-5 py-3 font-semibold">Target</th>
          <th className="px-5 py-3 font-semibold">Raised</th><th className="px-5 py-3 font-semibold">Remaining</th><th className="px-5 py-3 font-semibold">Progress</th>
        </tr></thead>
        <tbody>{FUNDING_CATEGORIES.map((c) => {
          const pct = c.target > 0 ? Math.round((c.raised / c.target) * 1000) / 10 : 0;
          return (
            <tr key={c.name} className="border-t border-mist">
              <td className="px-5 py-4"><span className="font-medium text-navy">{c.name}</span><span className="block text-xs text-neutral-500">{c.note}</span></td>
              <td className="px-5 py-4">{money(c.target, c.currency)}</td>
              <td className="px-5 py-4">{money(c.raised, c.currency)}</td>
              <td className="px-5 py-4">{money(c.target - c.raised, c.currency)}</td>
              <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-28"><ProgressBar value={pct} /></div>{pct}%</div></td>
            </tr>);})}
        </tbody>
      </table>
    </div>
  );
}

export function RecentDonations() {
  // Honest empty state: seed raised = 0 and no gateway is active, so there are
  // no verified donations to display. Donors are never invented.
  return (
    <section aria-label="Recent donations" className="rounded-3xl border border-mist bg-white p-6 sm:p-8">
      <h2 className="font-serif text-2xl font-semibold text-navy">Recent donations</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-neutral-500"><tr><th className="py-2 pr-4 font-semibold">Date</th><th className="py-2 pr-4 font-semibold">Donor</th><th className="py-2 pr-4 font-semibold">Amount</th><th className="py-2 font-semibold">Campaign / Category</th></tr></thead>
          <tbody><tr className="border-t border-mist"><td colSpan={4} className="py-6 text-center text-neutral-500">No verified donations to display yet. Completed, server-verified donations will appear here — with donor consent, or as &ldquo;Anonymous&rdquo; — once payment providers are activated.</td></tr></tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-neutral-500">Private contact details and transaction data are never displayed.</p>
    </section>
  );
}
