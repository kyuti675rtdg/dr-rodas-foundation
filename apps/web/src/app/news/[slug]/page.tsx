import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Share2 } from "lucide-react";
import { NEWS } from "@/lib/data";
import { NewsCard } from "../NewsClient";

export function generateStaticParams() { return NEWS.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = NEWS.find((x) => x.slug === slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title, description: a.summary,
    openGraph: { title: a.title, description: a.summary, type: "article", images: ["/logo.png"] },
    twitter: { card: "summary", title: a.title, description: a.summary, images: ["/logo.png"] },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = NEWS.find((x) => x.slug === slug);
  if (!a) notFound();
  const url = `https://drrodas.org/news/${a.slug}`;
  const share = [
    ["Share on X", `https://twitter.com/intent/tweet?text=${encodeURIComponent(a.title)}&url=${encodeURIComponent(url)}`],
    ["Share on Facebook", `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`],
    ["Share on LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`],
    ["Share on WhatsApp", `https://wa.me/?text=${encodeURIComponent(`${a.title} ${url}`)}`],
  ] as const;
  const related = NEWS.filter((x) => x.slug !== a.slug && x.category === a.category)
    .concat(NEWS.filter((x) => x.slug !== a.slug && x.category !== a.category)).slice(0, 3);
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/news" className="font-semibold text-gold hover:text-gold-dark">← All news</Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{a.category}</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight text-navy">{a.title}</h1>
      <p className="mt-2 font-serif text-xl text-neutral-600">{a.subtitle}</p>
      <p className="mt-3 text-sm text-neutral-500">By {a.author} · {a.dateLabel}</p>
      <p className="mt-4 rounded-2xl border border-gold/30 bg-ivory px-4 py-3 text-sm leading-6 text-gold-dark">{a.status} No featured image is published with this seed article; approved images with descriptive alt text will accompany real articles.</p>
      <div className="mt-6 space-y-5 leading-8 text-neutral-700">
        {a.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-mist pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy"><Share2 size={16} className="text-gold" /> Share</span>
        {share.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-gold hover:text-gold">{label}</a>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/museum-project" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-2">The Museum Project</Link>
        <Link href="/publications" className="rounded-full border border-mist bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-gold hover:text-gold">Related publications</Link>
        <Link href="/donate" className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-dark">Donate</Link>
      </div>
      {related.length > 0 && (
        <section className="mt-12"><h2 className="font-serif text-2xl font-semibold text-navy">Related news</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">{related.map((r) => <NewsCard key={r.slug} a={r} />)}</div>
        </section>)}
    </div>
  );
}
