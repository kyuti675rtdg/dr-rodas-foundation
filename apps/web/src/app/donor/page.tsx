
import type { Metadata } from "next";
import { Download, RefreshCcw, UserRound } from "lucide-react";
export const metadata: Metadata = { title: "Donor Dashboard" };
// Donor area surface. In production every row comes from GET /api/v1/donor/* behind
// Sanctum auth; the rows below are empty-state-safe seed placeholders for preview.
const HISTORY: { ref: string; date: string; campaign: string; amount: string; status: string; receipt: string }[] = [];
export default function Donor() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold-light"><UserRound /></span>
        <div><h1 className="font-serif text-3xl font-semibold text-navy">Donor Dashboard</h1><p className="text-sm text-neutral-500">Your giving history, receipts, recurring donations and preferences.</p></div></div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[["Total confirmed giving","$0","Only provider-confirmed donations are counted."],["Receipts available","0","PDF receipts are issued for every confirmed donation."],["Active recurring gifts","0","Manage or cancel recurring donations at any time."]].map(([t,v,d]) => (
          <div key={t} className="rounded-3xl border border-mist bg-white p-6"><p className="text-sm font-medium text-neutral-500">{t}</p><p className="mt-1 font-serif text-3xl font-semibold text-navy">{v}</p><p className="mt-1 text-xs text-neutral-500">{d}</p></div>))}
      </div>
      <h2 className="mt-10 font-serif text-2xl font-semibold text-navy">Donation history</h2>
      <div className="mt-4 overflow-hidden rounded-3xl border border-mist bg-white">
        {HISTORY.length === 0 ? <p className="p-8 text-center text-neutral-500">No donations yet in this preview. When you sign in with the live system, your searchable donation history and downloadable receipts appear here.</p> :
        <table className="w-full text-left text-sm"><thead className="bg-ivory text-neutral-500"><tr><th className="px-5 py-3">Reference</th><th className="px-5 py-3">Campaign</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Receipt</th></tr></thead><tbody /></table>}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-mist bg-white p-6"><h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><RefreshCcw size={18} className="text-gold" /> Recurring donations</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Recurring gifts appear here once a subscription-capable gateway is activated. You can pause or cancel from this page; essential receipts are always emailed regardless of marketing preferences.</p></div>
        <div className="rounded-3xl border border-mist bg-white p-6"><h3 className="flex items-center gap-2 font-serif text-lg font-semibold"><Download size={18} className="text-gold" /> Privacy &amp; preferences</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Control public recognition (including anonymous giving), campaign update emails and marketing separately. The foundation keeps legally required transaction records even for anonymous public gifts.</p></div>
      </div>
    </div>
  );
}
