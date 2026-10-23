"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PUBLICATIONS, PUBLICATION_CATEGORIES, type Publication } from "@/lib/data";
import { PageOpening } from "@/components/Editorial";
import Reveal from "@/components/Reveal";

const inputCls = "min-h-12 w-full border border-line bg-white px-3.5 py-3 text-navy placeholder:text-navy/40 transition-colors focus:border-gold";

/** A reading-room catalogue row: category, title, author — set like a folio entry. */
export function PublicationRow({ p }: { p: Publication }) {
  return (
    <article className="group grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
      <p className="text-xs leading-5 font-semibold tracking-[0.16em] text-gold-dark uppercase sm:col-span-3">{p.category}<span className="mt-1 block font-normal tracking-normal text-navy/50 normal-case">{p.dateLabel}</span></p>
      <div className="sm:col-span-7">
        <h3 className="font-serif text-xl leading-snug font-medium text-navy">
          <Link href={`/publications/${p.slug}`} className="transition-colors duration-300 group-hover:text-gold-dark">{p.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-navy/55">{p.author}</p>
        <p className="mt-2 leading-7 text-navy/65">{p.summary}</p>
      </div>
      <div className="sm:col-span-2 sm:text-right">
        <Link href={`/publications/${p.slug}`} className="link-sweep text-sm font-semibold text-gold-dark">View details</Link>
      </div>
    </article>
  );
}

export function PublicationCard({ p }: { p: Publication }) {
  return <PublicationRow p={p} />;
}

export default function PublicationsClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const topics = useMemo(() => [...new Set(PUBLICATIONS.map((p) => p.topic))], []);
  const dates = useMemo(() => [...new Set(PUBLICATIONS.map((p) => p.dateLabel))], []);
  const list = useMemo(() => PUBLICATIONS.filter((p) => {
    const hay = `${p.title} ${p.author} ${p.topic} ${p.category} ${p.summary}`.toLowerCase();
    return (!q || hay.includes(q.toLowerCase())) && (!cat || p.category === cat) && (!topic || p.topic === topic) && (!date || p.dateLabel === date);
  }), [q, cat, topic, date]);
  const featured = PUBLICATIONS.filter((p) => p.featured);
  return (
    <div>
      <PageOpening rubric="Publications" title="The digital library" lede="Approved books, research papers, articles, reports and educational materials on Ge’ez language, manuscripts, Ethiopian history, Gematria, astronomy, philosophy and cultural heritage." />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <p className="max-w-3xl border-l-2 border-gold/70 pl-4 text-sm leading-6 text-gold-dark">
            <strong>Seed library:</strong> the entries below are clearly-labelled development placeholders awaiting foundation approval — no real book or author is claimed yet. Verified publications will replace them through the foundation&rsquo;s CMS.
          </p>
        </Reveal>

        <h2 className="mt-14 font-serif text-2xl font-medium text-navy sm:text-3xl">Featured publications</h2>
        <div className="mt-2 border-t border-line">
          {featured.map((p) => <PublicationRow key={p.slug} p={p} />)}
        </div>

        <h2 className="mt-16 font-serif text-2xl font-medium text-navy sm:text-3xl">Browse the library</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-4" role="search">
          <label className="relative">
            <Search size={16} className="absolute top-4 left-3.5 text-navy/40" aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, author, topic…" aria-label="Search publications" className={`${inputCls} pl-10`} />
          </label>
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category" className={inputCls}>
            <option value="">All categories</option>{PUBLICATION_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Filter by topic" className={inputCls}>
            <option value="">All topics</option>{topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={date} onChange={(e) => setDate(e.target.value)} aria-label="Filter by publication date" className={inputCls}>
            <option value="">All dates</option>{dates.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        {list.length === 0
          ? <p className="mt-10 border border-dashed border-line px-6 py-12 text-center text-navy/55">No seed entries match your search. Verified publications will appear here once the foundation approves them.</p>
          : <div className="mt-4 border-t border-line">{list.map((p) => <PublicationRow key={p.slug} p={p} />)}</div>}
      </div>
    </div>
  );
}
