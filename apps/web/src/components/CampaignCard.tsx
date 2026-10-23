
import Link from "next/link"; import { ArrowRight, CalendarDays, Users } from "lucide-react";
import { money, progress, type Campaign } from "@/lib/data";
export function ProgressBar({ value }: { value: number }) {
  return <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all" style={{ width: `${value}%` }} /></div>;
}
export default function CampaignCard({ c }: { c: Campaign }) {
  const p = progress(c);
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className={`relative flex h-44 items-end bg-gradient-to-br ${c.hue} p-5`}>
        <span className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#d6d3d1_1px,transparent_0)] [background-size:22px_22px]" aria-hidden />
        <div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">{c.categoryName}</p>
        <h3 className="mt-1 font-serif text-2xl font-semibold leading-snug text-white">{c.title}</h3></div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex-1 text-sm leading-6 text-stone-600">{c.summary}</p>
        <div className="mt-4"><div className="flex justify-between text-sm"><span className="font-bold text-stone-900">{money(c.raised, c.currency)} raised</span><span className="text-stone-500">of {money(c.target, c.currency)}</span></div>
          <div className="mt-2"><ProgressBar value={p} /></div>
          <div className="mt-2 flex items-center gap-4 text-xs text-stone-500"><span>{p}% funded</span><span className="inline-flex items-center gap-1"><Users size={13} /> {c.donors} donors</span><span className="inline-flex items-center gap-1"><CalendarDays size={13} /> Closes {c.deadline}</span></div></div>
        <div className="mt-5 flex gap-3">
          <Link href={`/donate?campaign=${c.slug}`} className="flex-1 rounded-full bg-stone-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-stone-700">Donate</Link>
          <Link href={`/campaigns/${c.slug}`} className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-800 hover:border-amber-600 hover:text-amber-700">Details <ArrowRight size={15} /></Link>
        </div>
      </div>
    </article>
  );
}
