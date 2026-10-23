
import type { Metadata } from "next";
import { Suspense } from "react";
import CampaignCard from "@/components/CampaignCard";
import { CAMPAIGNS, CATEGORIES } from "@/lib/data";
export const metadata: Metadata = { title: "Campaigns" };
export default function Campaigns(props: { searchParams?: Promise<{ category?: string }> }) {
  return <Suspense fallback={<p className="mx-auto max-w-7xl px-4 py-14 text-neutral-500">Loading campaigns…</p>}><CampaignsInner {...props} /></Suspense>;
}
async function CampaignsInner({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const cat = (await searchParams)?.category;
  const list = cat ? CAMPAIGNS.filter((c) => c.category === cat) : CAMPAIGNS;
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Fundraising Campaigns</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">Choose a campaign to support</h1>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <a href="/campaigns" className={`rounded-full border px-4 py-2 text-sm font-semibold ${!cat ? "border-gold bg-ivory text-gold-dark" : "border-mist text-neutral-600"}`}>All</a>
        {CATEGORIES.map((c) => <a key={c.slug} href={`/campaigns?category=${c.slug}`} className={`rounded-full border px-4 py-2 text-sm font-semibold ${cat === c.slug ? "border-gold bg-ivory text-gold-dark" : "border-mist text-neutral-600"}`}>{c.name}</a>)}
      </div>
      {list.length === 0 ? <p className="mt-10 rounded-3xl border border-dashed border-mist bg-white p-10 text-center text-neutral-500">No published campaigns in this category yet.</p> :
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((c) => <CampaignCard key={c.slug} c={c} />)}</div>}
    </div>
  );
}
