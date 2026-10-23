import Link from "next/link";
import { CalendarDays, Users } from "lucide-react";
import { money, progress, type Campaign } from "@/lib/data";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`Progress: ${value}%`}>
      <div className="h-full rounded-full bg-gold transition-[width] duration-700 ease-out" style={{ width: `${value}%` }} />
    </div>
  );
}

/** Editorial campaign entry: a ruled row, not a card. */
export default function CampaignCard({ c }: { c: Campaign }) {
  const p = progress(c);
  return (
    <article className="group flex flex-col border-t border-line py-7">
      <p className="text-xs font-semibold tracking-[0.16em] text-gold-dark uppercase">{c.categoryName}</p>
      <h3 className="mt-2 font-serif text-2xl leading-snug font-medium text-navy">
        <Link href={`/campaigns/${c.slug}`} className="transition-colors duration-300 group-hover:text-gold-dark">{c.title}</Link>
      </h3>
      <p className="mt-2 flex-1 leading-7 text-navy/65">{c.summary}</p>
      <div className="mt-5">
        <div className="flex flex-wrap justify-between gap-2 text-sm">
          <span className="font-semibold text-navy">{money(c.raised, c.currency)} raised</span>
          <span className="text-navy/55">of {money(c.target, c.currency)}</span>
        </div>
        <div className="mt-2.5"><ProgressBar value={p} /></div>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy/55">
          <span>{p}% funded</span>
          <span className="inline-flex items-center gap-1"><Users size={13} aria-hidden /> {c.donors} donors</span>
          <span className="inline-flex items-center gap-1"><CalendarDays size={13} aria-hidden /> Closes {c.deadline}</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <Link href={`/donate?campaign=${c.slug}`} className="link-sweep min-h-8 content-center text-gold-dark">Donate to this campaign</Link>
        <Link href={`/campaigns/${c.slug}`} className="link-sweep min-h-8 content-center text-navy">Campaign details</Link>
      </div>
    </article>
  );
}
