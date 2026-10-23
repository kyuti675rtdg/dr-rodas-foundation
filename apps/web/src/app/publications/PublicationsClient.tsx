"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { PUBLICATIONS, PUBLICATION_CATEGORIES, type Publication } from "@/lib/data";

export function PublicationCard({ p }: { p: Publication }) {
  return (
    <article className="flex flex-col rounded-3xl border border-mist bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold"><BookOpen size={14} /> {p.category}</div>
      <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-navy"><Link href={`/publications/${p.slug}`} className="hover:text-gold">{p.title}</Link></h3>
      <p className="mt-1 text-sm text-neutral-500">{p.author} · {p.dateLabel}</p>
      <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{p.summary}</p>
      <p className="mt-3 rounded-xl bg-ivory px-3 py-2 text-xs leading-5 text-gold-dark">{p.status}</p>
      <Link href={`/publications/${p.slug}`} className="mt-4 font-semibold text-gold hover:text-gold-dark">View details →</Link>
    </article>
  );
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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Publications</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">Digital library</h1>
      <p className="mt-4 max-w-3xl leading-7 text-neutral-600">Search approved books, research papers, articles, reports and educational materials on Ge&rsquo;ez language, manuscripts, Ethiopian history, Gematria, astronomy, philosophy and cultural heritage.</p>
      <p className="mt-4 rounded-2xl border border-gold/30 bg-ivory px-4 py-3 text-sm leading-6 text-gold-dark"><strong>Seed library:</strong> the entries below are clearly-labelled development placeholders awaiting foundation approval — no real book or author is claimed yet. Verified publications will replace them through the foundation&rsquo;s CMS.</p>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-navy">Featured publications</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map((p) => <PublicationCard key={p.slug} p={p} />)}</div>

      <h2 className="mt-14 font-serif text-2xl font-semibold text-navy">Browse the library</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-4" role="search">
        <label className="relative md:col-span-1"><Search size={16} className="absolute left-3 top-3.5 text-neutral-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, author, topic, keyword…" aria-label="Search publications" className="w-full rounded-xl border border-mist bg-white py-3 pl-9 pr-3" /></label>
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category" className="rounded-xl border border-mist bg-white px-3 py-3">
          <option value="">All categories</option>{PUBLICATION_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Filter by topic" className="rounded-xl border border-mist bg-white px-3 py-3">
          <option value="">All topics</option>{topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={date} onChange={(e) => setDate(e.target.value)} aria-label="Filter by publication date" className="rounded-xl border border-mist bg-white px-3 py-3">
          <option value="">All dates</option>{dates.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      {list.length === 0
        ? <p className="mt-8 rounded-3xl border border-dashed border-mist bg-white p-10 text-center text-neutral-500">No seed entries match your search. Verified publications will appear here once the foundation approves them.</p>
        : <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PublicationCard key={p.slug} p={p} />)}</div>}
    </div>
  );
}
