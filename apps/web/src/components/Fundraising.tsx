import { FUNDING_CATEGORIES, LAST_VERIFIED_UPDATE, money } from "@/lib/data";
import { ProgressBar } from "@/components/CampaignCard";
import Reveal from "@/components/Reveal";

export function totals() {
  const target = FUNDING_CATEGORIES.reduce((s, c) => s + c.target, 0);
  const raised = FUNDING_CATEGORIES.reduce((s, c) => s + c.raised, 0);
  return { target, raised, remaining: target - raised, pct: target > 0 ? Math.round((raised / target) * 1000) / 10 : 0 };
}

export function FundraisingSummary() {
  const t = totals();
  return (
    <Reveal>
      <section aria-label="Fundraising summary" className="border-y border-line py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Museum fundraising, in the open</h2>
          <span className="text-xs font-semibold tracking-[0.14em] text-gold-dark uppercase">Confirmed donations only</span>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {[
            ["Fundraising target", money(t.target)],
            ["Verified raised", money(t.raised)],
            ["Remaining", money(t.remaining)],
            ["Completed", `${t.pct}%`],
          ].map(([label, value]) => (
            <div key={label} className="border-l-2 border-gold/70 pl-4">
              <dt className="text-xs tracking-[0.14em] text-navy/55 uppercase">{label}</dt>
              <dd className="mt-1.5 font-serif text-3xl font-medium text-navy sm:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-7"><ProgressBar value={t.pct} /></div>
        <p className="mt-4 max-w-3xl text-xs leading-5 text-navy/55">Last verified update: {LAST_VERIFIED_UPDATE} Targets below are proposed seed figures pending foundation approval; live totals come only from server-verified, confirmed donations.</p>
      </section>
    </Reveal>
  );
}

export function CategoriesTable() {
  return (
    <div className="overflow-x-auto border-y border-line">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Donation targets and progress by funding category</caption>
        <thead>
          <tr className="text-navy/55">
            <th className="py-3 pr-5 font-semibold">Funding category</th>
            <th className="px-5 py-3 font-semibold">Target</th>
            <th className="px-5 py-3 font-semibold">Raised</th>
            <th className="px-5 py-3 font-semibold">Remaining</th>
            <th className="py-3 pl-5 font-semibold">Progress</th>
          </tr>
        </thead>
        <tbody>
          {FUNDING_CATEGORIES.map((c) => {
            const pct = c.target > 0 ? Math.round((c.raised / c.target) * 1000) / 10 : 0;
            return (
              <tr key={c.name} className="border-t border-line">
                <td className="py-4 pr-5"><span className="font-medium text-navy">{c.name}</span><span className="block text-xs text-navy/55">{c.note}</span></td>
                <td className="px-5 py-4 whitespace-nowrap">{money(c.target, c.currency)}</td>
                <td className="px-5 py-4 whitespace-nowrap">{money(c.raised, c.currency)}</td>
                <td className="px-5 py-4 whitespace-nowrap">{money(c.target - c.raised, c.currency)}</td>
                <td className="py-4 pl-5"><div className="flex items-center gap-3"><div className="w-24"><ProgressBar value={pct} /></div>{pct}%</div></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function RecentDonations() {
  // Honest empty state: seed raised = 0 and no gateway is active, so there are
  // no verified donations to display. Donors are never invented.
  return (
    <Reveal>
      <section aria-label="Recent donations" className="border-y border-line py-8">
        <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Recent donations</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-navy/55"><tr><th className="py-2 pr-4 font-semibold">Date</th><th className="py-2 pr-4 font-semibold">Donor</th><th className="py-2 pr-4 font-semibold">Amount</th><th className="py-2 font-semibold">Campaign / Category</th></tr></thead>
            <tbody>
              <tr className="border-t border-line">
                <td colSpan={4} className="py-8 text-center leading-7 text-navy/55">No verified donations to display yet. Completed, server-verified donations will appear here — with donor consent, or as &ldquo;Anonymous&rdquo; — once payment providers are activated.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-navy/55">Private contact details and transaction data are never displayed.</p>
      </section>
    </Reveal>
  );
}
