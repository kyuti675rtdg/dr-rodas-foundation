"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Newspaper, Search } from "lucide-react";
import { NEWS, NEWS_CATEGORIES, type NewsArticle } from "@/lib/data";

export function NewsCard({ a }: { a: NewsArticle }) {
  return (
    <article className="flex flex-col rounded-3xl border border-mist bg-white p-6 shadow-sm transition hover:shadow-lg">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold"><Newspaper size={14} /> {a.category}</p>
      <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-navy"><Link href={`/news/${a.slug}`} className="hover:text-gold">{a.title}</Link></h3>
      <p className="mt-1 text-sm text-neutral-500">{a.dateLabel}</p>
      <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{a.summary}</p>
      <p className="mt-3 rounded-xl bg-ivory px-3 py-2 text-xs leading-5 text-gold-dark">{a.status}</p>
      <Link href={`/news/${a.slug}`} className="mt-4 font-semibold text-gold hover:text-gold-dark">Read article →</Link>
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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">News</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">Foundation news &amp; updates</h1>
      <p className="mt-4 max-w-3xl leading-7 text-neutral-600">News for visitors, supporters, researchers and donors — foundation announcements, Museum Project updates, fundraising campaigns, research, heritage events, education programs and partnerships.</p>
      <p className="mt-4 rounded-2xl border border-gold/30 bg-ivory px-4 py-3 text-sm leading-6 text-gold-dark"><strong>Seed newsroom:</strong> only development seed articles are shown. No real announcements, events, partnerships or milestones are claimed — verified news will be published by authorized staff through the CMS.</p>

      {featured && (
        <article className="mt-10 overflow-hidden rounded-3xl bg-navy text-white">
          <div className="p-8 sm:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-light">Featured top story · {featured.category}</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl"><Link href={`/news/${featured.slug}`} className="hover:text-gold-light">{featured.title}</Link></h2>
            <p className="mt-2 font-serif text-lg text-neutral-300">{featured.subtitle}</p>
            <p className="mt-4 max-w-3xl leading-7 text-neutral-300">{featured.summary}</p>
            <p className="mt-3 text-sm text-neutral-400">{featured.author} · {featured.dateLabel}</p>
            <Link href={`/news/${featured.slug}`} className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-white hover:bg-gold-dark">Read the story</Link>
          </div>
        </article>)}

      <div className="mt-12 grid gap-3 md:grid-cols-3" role="search">
        <label className="relative"><Search size={16} className="absolute left-3 top-3.5 text-neutral-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by keyword…" aria-label="Search news" className="w-full rounded-xl border border-mist bg-white py-3 pl-9 pr-3" /></label>
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category" className="rounded-xl border border-mist bg-white px-3 py-3">
          <option value="">All categories</option>{NEWS_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={date} onChange={(e) => setDate(e.target.value)} aria-label="Filter by date" className="rounded-xl border border-mist bg-white px-3 py-3">
          <option value="">All dates</option>{dates.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      {list.length === 0
        ? <p className="mt-8 rounded-3xl border border-dashed border-mist bg-white p-10 text-center text-neutral-500">No articles match your filters yet. Published foundation news will appear here.</p>
        : <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((a) => <NewsCard key={a.slug} a={a} />)}</div>}
    </div>
  );
}
