
import type { Metadata } from "next";
import Link from "next/link"; import { notFound } from "next/navigation";
import { CalendarDays, Target, Users } from "lucide-react";
import { ProgressBar } from "@/components/CampaignCard";
import { CAMPAIGNS, UPDATES, money, progress } from "@/lib/data";
export function generateStaticParams() { return CAMPAIGNS.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const c = CAMPAIGNS.find((x) => x.slug === slug);
  return { title: c?.title ?? "Campaign", description: c?.summary };
}
export default async function CampaignDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = CAMPAIGNS.find((x) => x.slug === slug); if (!c) notFound();
  const p = progress(c); const updates = UPDATES.filter((u) => u.campaign === c.title);
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className={`rounded-3xl bg-gradient-to-br ${c.hue} p-8 text-white sm:p-12`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">{c.categoryName}</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-5xl">{c.title}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-stone-200">{c.summary}</p>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section><h2 className="font-serif text-2xl font-semibold text-stone-900">About this campaign</h2><p className="mt-3 leading-7 text-stone-700">{c.description}</p></section>
          <section><h2 className="font-serif text-2xl font-semibold text-stone-900">Latest updates</h2>
            {updates.length === 0 ? <p className="mt-3 text-stone-500">The foundation will publish progress reports and project updates here.</p> :
            updates.map((u) => <article key={u.id} className="mt-4 rounded-2xl border border-stone-200 bg-white p-5"><p className="text-xs font-semibold uppercase tracking-widest text-amber-700">{u.date}</p><h3 className="mt-1 font-semibold text-stone-900">{u.title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{u.body}</p></article>)}
          </section>
        </div>
        <aside className="h-fit rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="font-serif text-3xl font-semibold text-stone-900">{money(c.raised, c.currency)}</p>
          <p className="text-sm text-stone-500">raised of {money(c.target, c.currency)} goal</p>
          <div className="mt-3"><ProgressBar value={p} /></div>
          <dl className="mt-4 space-y-2 text-sm text-stone-600">
            <div className="flex items-center gap-2"><Target size={15} className="text-amber-700" /> {p}% funded</div>
            <div className="flex items-center gap-2"><Users size={15} className="text-amber-700" /> {c.donors} donors</div>
            <div className="flex items-center gap-2"><CalendarDays size={15} className="text-amber-700" /> Closes {c.deadline}</div></dl>
          <Link href={`/donate?campaign=${c.slug}`} className="mt-5 block rounded-full bg-amber-600 px-6 py-3 text-center font-semibold text-white hover:bg-amber-700">Donate to this campaign</Link>
          <p className="mt-3 text-xs leading-5 text-stone-500">Progress counts confirmed donations only. Share this page to help the campaign reach its goal.</p>
        </aside>
      </div>
    </div>
  );
}
