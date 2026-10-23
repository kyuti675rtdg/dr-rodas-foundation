import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Target, Users } from "lucide-react";
import { ProgressBar } from "@/components/CampaignCard";
import { Rubric } from "@/components/Editorial";
import Reveal from "@/components/Reveal";
import { CAMPAIGNS, UPDATES, money, progress } from "@/lib/data";

export function generateStaticParams() { return CAMPAIGNS.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CAMPAIGNS.find((x) => x.slug === slug);
  return { title: c?.title ?? "Campaign", description: c?.summary };
}

export default async function CampaignDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CAMPAIGNS.find((x) => x.slug === slug);
  if (!c) notFound();
  const p = progress(c);
  const updates = UPDATES.filter((u) => u.campaign === c.title);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 lg:pt-20">
      <Reveal>
        <Rubric>{c.categoryName}</Rubric>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] font-medium text-navy sm:text-5xl lg:text-6xl">{c.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-navy/65">{c.summary}</p>
        <div className="rule-gold mt-10" aria-hidden />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-7">
          <section>
            <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">About this campaign</h2>
            <p className="mt-4 max-w-2xl leading-7 text-navy/70">{c.description}</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Latest updates</h2>
            {updates.length === 0
              ? <p className="mt-4 leading-7 text-navy/55">The foundation will publish progress reports and project updates here.</p>
              : updates.map((u) => (
                <article key={u.id} className="mt-5 border-t border-line pt-5">
                  <p className="text-xs font-semibold tracking-[0.16em] text-gold-dark uppercase">{u.date}</p>
                  <h3 className="mt-2 font-serif text-xl font-medium text-navy">{u.title}</h3>
                  <p className="mt-2 leading-7 text-navy/65">{u.body}</p>
                </article>
              ))}
          </section>
        </div>
        <aside className="h-fit border-t-2 border-gold bg-ivory p-7 lg:col-span-5">
          <p className="font-serif text-4xl font-medium text-navy">{money(c.raised, c.currency)}</p>
          <p className="mt-1 text-sm text-navy/60">raised of {money(c.target, c.currency)} goal</p>
          <div className="mt-4"><ProgressBar value={p} /></div>
          <dl className="mt-5 space-y-2.5 text-sm text-navy/70">
            <div className="flex items-center gap-2"><Target size={15} className="text-gold-dark" aria-hidden /> {p}% funded</div>
            <div className="flex items-center gap-2"><Users size={15} className="text-gold-dark" aria-hidden /> {c.donors} donors</div>
            <div className="flex items-center gap-2"><CalendarDays size={15} className="text-gold-dark" aria-hidden /> Closes {c.deadline}</div>
          </dl>
          <Link href={`/donate?campaign=${c.slug}`} className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-gold px-6 py-3 text-center font-semibold text-white transition-colors duration-300 hover:bg-gold-dark">Donate to this campaign</Link>
          <p className="mt-4 text-xs leading-5 text-navy/55">Progress counts confirmed donations only. Share this page to help the campaign reach its goal.</p>
        </aside>
      </div>
    </div>
  );
}
