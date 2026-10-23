import type { Metadata } from "next";
import { Suspense } from "react";
import CampaignCard from "@/components/CampaignCard";
import { PageOpening } from "@/components/Editorial";
import { CAMPAIGNS, CATEGORIES } from "@/lib/data";

export const metadata: Metadata = { title: "Campaigns" };

export default function Campaigns(props: { searchParams?: Promise<{ category?: string }> }) {
  return <Suspense fallback={<p className="mx-auto max-w-7xl px-4 py-14 text-navy/55">Loading campaigns…</p>}><CampaignsInner {...props} /></Suspense>;
}

async function CampaignsInner({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const cat = (await searchParams)?.category;
  const list = cat ? CAMPAIGNS.filter((c) => c.category === cat) : CAMPAIGNS;
  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${active ? "border-gold bg-ivory text-gold-dark" : "border-line bg-white text-navy/65 hover:border-gold/60 hover:text-navy"}`;
  return (
    <div>
      <PageOpening rubric="Fundraising Campaigns" title="Choose a campaign to support" />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <a href="/campaigns" className={chip(!cat)}>All</a>
          {CATEGORIES.map((c) => (
            <a key={c.slug} href={`/campaigns?category=${c.slug}`} className={chip(cat === c.slug)}>{c.name}</a>
          ))}
        </div>
        {list.length === 0
          ? <p className="mt-12 border border-dashed border-line px-6 py-12 text-center text-navy/55">No published campaigns in this category yet.</p>
          : <div className="mt-4 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">{list.map((c) => <CampaignCard key={c.slug} c={c} />)}</div>}
      </div>
    </div>
  );
}
