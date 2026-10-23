"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { NEWS, NEWS_CATEGORIES, type NewsArticle } from "@/lib/data";
import { PageOpening } from "@/components/Editorial";
import Reveal from "@/components/Reveal";

const inputCls = "min-h-12 w-full border border-line bg-white px-3.5 py-3 text-navy placeholder:text-navy/40 transition-colors focus:border-gold";

export function NewsCard({ a }: { a: NewsArticle }) {
  return (
    <article className="group flex flex-col border-t border-line py-7">
      <p className="text-xs font-semibold tracking-[0.16em] text-gold-dark uppercase">{a.category}</p>
      <h3 className="mt-2 font-serif text-[1.35rem] leading-snug font-medium text-navy">
        <Link href={`/news/${a.slug}`} className="transition-colors duration-300 group-hover:text-gold-dark">{a.title}</Link>
      </h3>
      <p className="mt-1.5 text-sm text-navy/55">{a.dateLabel}</p>
      <p className="mt-3 flex-1 leading-7 text-navy/65">{a.summary}</p>
      <p className="mt-3 border-l-2 border-gold/60 pl-3 text-xs leading-5 text-gold-dark">{a.status}</p>
      <Link href={`/news/${a.slug}`} className="link-sweep mt-4 self-start text-sm font-semibold text-gold-dark">Read the article</Link>
    </article>
  );
}

export default function NewsClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [date, setDate] = useState("");
  const dates = useMemo(() => [...new Set(NEWS.map((a) => a.dateLabel))], []);
  const list = useMemo(() => NEWS.filter((a) => {
    const hay = `${a.title} ${a.subtitle} ${a.summary} ${a.category} ${a.author}`.toLowerCase();
    return (!q || hay.includes(q.toLowerCase())) && (!cat || a.category === cat) && (!date || a.dateLabel === date);
  }), [q, cat, date]);
  const featured = NEWS.find((a) => a.featured) ?? NEWS[0];
  return (
    <div>
      <PageOpening rubric="News" title="Foundation news &amp; updates" lede="News for visitors, supporters, researchers and donors — foundation announcements, Museum Project updates, fundraising campaigns, research, heritage events, education programs and partnerships." />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <p className="max-w-3xl border-l-2 border-gold/70 pl-4 text-sm leading-6 text-gold-dark">
            <strong>Seed newsroom:</strong> only development seed articles are shown. No real announcements, events, partnerships or milestones are claimed — verified news will be published by authorized staff through the CMS.
          </p>
        </Reveal>

        {featured && (
          <Reveal>
            <article className="mt-12 grid gap-8 border-y border-line py-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-gold-dark uppercase">Featured story · {featured.category}</p>
                <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">
                  <Link href={`/news/${featured.slug}`} className="transition-colors hover:text-gold-dark">{featured.title}</Link>
                </h2>
                <p className="mt-3 font-serif text-lg text-navy/60 italic">{featured.subtitle}</p>
                <p className="mt-4 max-w-2xl leading-7 text-navy/65">{featured.summary}</p>
                <Link href={`/news/${featured.slug}`} className="link-sweep mt-6 inline-block font-semibold text-gold-dark">Read the story</Link>
              </div>
              <p className="text-sm leading-6 text-navy/55 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">{featured.author}<br />{featured.dateLabel}</p>
            </article>
          </Reveal>
        )}

        <div className="mt-14 grid gap-3 md:grid-cols-3" role="search">
          <label className="relative">
            <Search size={16} className="absolute top-4 left-3.5 text-navy/40" aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by keyword…" aria-label="Search news" className={`${inputCls} pl-10`} />
          </label>
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category" className={inputCls}>
            <option value="">All categories</option>{NEWS_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={date} onChange={(e) => setDate(e.target.value)} aria-label="Filter by date" className={inputCls}>
            <option value="">All dates</option>{dates.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        {list.length === 0
          ? <p className="mt-10 border border-dashed border-line px-6 py-12 text-center text-navy/55">No articles match your filters yet. Published foundation news will appear here.</p>
          : <div className="mt-6 grid gap-x-12 lg:grid-cols-3">{list.map((a) => <NewsCard key={a.slug} a={a} />)}</div>}
      </div>
    </div>
  );
}
