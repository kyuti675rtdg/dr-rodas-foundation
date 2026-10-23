
import type { Metadata } from "next";
import { CAMPAIGNS, money, progress } from "@/lib/data";
import { ProgressBar } from "@/components/CampaignCard";
export const metadata: Metadata = { title: "Financial Transparency" };
export default function Transparency() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Financial Transparency</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-stone-900">How funds are tracked and used</h1>
      <p className="mt-4 max-w-3xl leading-7 text-stone-600">The foundation distinguishes <strong>confirmed donations</strong>, <strong>payment fees</strong>, <strong>pending settlements</strong>, <strong>available balances</strong> and <strong>disbursed funds</strong>. Gross donations are never reported as available cash before settlement and reconciliation. Public summaries are published only after authorised review; donor identities are never published.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[["Gross confirmed donations","Counted only when the payment provider confirms the transaction server-side."],["Allocations & disbursements","Prepared by a Finance Officer and approved by a Foundation Administrator before any disbursement."],["Refunds & adjustments","Refunds are recorded transactions that reverse campaign progress — records are never silently edited."]].map(([t,d]) => (
          <div key={t} className="rounded-3xl border border-stone-200 bg-white p-6"><h2 className="font-serif text-lg font-semibold text-stone-900">{t}</h2><p className="mt-2 text-sm leading-6 text-stone-600">{d}</p></div>))}
      </div>
      <h2 className="mt-12 font-serif text-2xl font-semibold text-stone-900">Campaign fund status</h2>
      <div className="mt-5 overflow-hidden rounded-3xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm"><thead className="bg-stone-50 text-stone-500"><tr><th className="px-5 py-3 font-semibold">Campaign</th><th className="px-5 py-3 font-semibold">Goal</th><th className="px-5 py-3 font-semibold">Confirmed</th><th className="px-5 py-3 font-semibold">Progress</th></tr></thead>
        <tbody>{CAMPAIGNS.map((c) => <tr key={c.slug} className="border-t border-stone-100"><td className="px-5 py-4 font-medium text-stone-900">{c.title}</td><td className="px-5 py-4">{money(c.target, c.currency)}</td><td className="px-5 py-4">{money(c.raised, c.currency)}</td><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-32"><ProgressBar value={progress(c)} /></div>{progress(c)}%</div></td></tr>)}</tbody></table>
      </div>
      <p className="mt-4 text-xs text-stone-500">Preview figures are development seed values (currently zero). In production this page is generated from the audited finance API and published reports with their reporting periods.</p>
    </div>
  );
}
