import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Download } from "lucide-react";
import { PUBLICATIONS } from "@/lib/data";

export function generateStaticParams() { return PUBLICATIONS.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PUBLICATIONS.find((x) => x.slug === slug);
  if (!p) return { title: "Publication not found" };
  return { title: p.title, description: p.summary, openGraph: { title: p.title, description: p.summary, images: ["/logo.png"] } };
}

export default async function PublicationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PUBLICATIONS.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = PUBLICATIONS.filter((x) => x.slug !== p.slug && (x.category === p.category || x.topic === p.topic)).slice(0, 3);
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/publications" className="font-semibold text-gold hover:text-gold-dark">← All publications</Link>
      <p className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold"><BookOpen size={14} /> {p.category} · {p.topic}</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight text-navy">{p.title}</h1>
      <p className="mt-3 text-sm text-neutral-500">{p.author} · {p.dateLabel}</p>
      <p className="mt-4 rounded-2xl border border-gold/30 bg-ivory px-4 py-3 text-sm leading-6 text-gold-dark">{p.status}</p>
      <p className="mt-6 text-lg leading-8 text-neutral-700">{p.summary}</p>
      <div className="mt-4 space-y-4 leading-7 text-neutral-700"><p>{p.body}</p></div>
      <div className="mt-8 rounded-3xl border border-mist bg-white p-6">
        <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-navy"><Download size={18} className="text-gold" /> PDF &amp; downloads</h2>
        {p.fileUrl
          ? <p className="mt-2 text-sm leading-6 text-neutral-600">This publication is authorized for download by the foundation. <a className="font-semibold text-gold" href={p.fileUrl}>Download PDF</a></p>
          : <p className="mt-2 text-sm leading-6 text-neutral-600">Download available after foundation approval. No file is attached to this seed entry, and no download is offered until the foundation authorizes one.</p>}
      </div>
      {related.length > 0 && (
        <section className="mt-10"><h2 className="font-serif text-2xl font-semibold text-navy">Related publications</h2>
          <ul className="mt-4 space-y-3">{related.map((r) => <li key={r.slug}><Link href={`/publications/${r.slug}`} className="font-semibold text-gold hover:text-gold-dark">{r.title}</Link><span className="text-sm text-neutral-500"> — {r.category}</span></li>)}</ul>
        </section>)}
    </div>
  );
}
