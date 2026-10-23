import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { PUBLICATIONS } from "@/lib/data";
import { Rubric } from "@/components/Editorial";
import Reveal from "@/components/Reveal";

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
    <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6">
      <div className="max-w-3xl">
        <Link href="/publications" className="link-sweep text-sm font-semibold text-gold-dark">All publications</Link>
        <Reveal>
          <div className="mt-8">
            <Rubric>{p.category} · {p.topic}</Rubric>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] font-medium text-navy sm:text-5xl">{p.title}</h1>
            <p className="mt-4 border-b border-line pb-6 text-sm text-navy/55">{p.author} · {p.dateLabel}</p>
          </div>
        </Reveal>
        <p className="mt-6 border-l-2 border-gold/70 pl-4 text-sm leading-6 text-gold-dark">{p.status}</p>
        <p className="mt-8 font-serif text-xl leading-relaxed text-navy/85">{p.summary}</p>
        <div className="mt-5 space-y-4 text-lg leading-8 text-navy/75"><p>{p.body}</p></div>

        <div className="mt-10 border-t border-line pt-8">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-medium text-navy"><Download size={19} className="text-gold-dark" aria-hidden /> PDF &amp; downloads</h2>
          {p.fileUrl
            ? <p className="mt-3 leading-7 text-navy/70">This publication is authorized for download by the foundation. <a className="link-sweep font-semibold text-gold-dark" href={p.fileUrl}>Download PDF</a></p>
            : <p className="mt-3 leading-7 text-navy/70">Download available after foundation approval. No file is attached to this seed entry, and no download is offered until the foundation authorizes one.</p>}
        </div>

        {related.length > 0 && (
          <section className="mt-12 border-t border-line pt-8">
            <h2 className="font-serif text-2xl font-medium text-navy">Related publications</h2>
            <ul className="mt-4">
              {related.map((r) => (
                <li key={r.slug} className="border-b border-line py-4">
                  <Link href={`/publications/${r.slug}`} className="link-sweep font-serif text-lg font-medium text-navy">{r.title}</Link>
                  <span className="block text-sm text-navy/55">{r.category}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
