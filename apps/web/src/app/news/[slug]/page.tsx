import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Share2 } from "lucide-react";
import { NEWS } from "@/lib/data";
import { Rubric } from "@/components/Editorial";
import Reveal from "@/components/Reveal";
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
    <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6">
      <div className="max-w-3xl">
        <Link href="/news" className="link-sweep text-sm font-semibold text-gold-dark">All news</Link>
        <Reveal>
          <div className="mt-8">
            <Rubric>{a.category}</Rubric>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] font-medium text-navy sm:text-5xl">{a.title}</h1>
            <p className="mt-3 font-serif text-xl leading-relaxed text-navy/60 italic">{a.subtitle}</p>
            <p className="mt-4 border-b border-line pb-6 text-sm text-navy/55">By {a.author} · {a.dateLabel}</p>
          </div>
        </Reveal>
        <p className="mt-6 border-l-2 border-gold/70 pl-4 text-sm leading-6 text-gold-dark">{a.status} No featured image is published with this seed article; approved images with descriptive alt text will accompany real articles.</p>
        <div className="mt-8 space-y-5 text-lg leading-8 text-navy/75">
          {a.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-7">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy"><Share2 size={16} className="text-gold-dark" aria-hidden /> Share</span>
          {share.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors duration-300 hover:border-gold hover:text-gold-dark">{label}</a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link href="/museum-project" className="link-sweep min-h-8 content-center text-navy">The Museum Project</Link>
          <Link href="/publications" className="link-sweep min-h-8 content-center text-navy">Related publications</Link>
          <Link href="/donate" className="link-sweep min-h-8 content-center text-gold-dark">Donate</Link>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Related news</h2>
          <div className="grid gap-x-12 lg:grid-cols-3">{related.map((r) => <NewsCard key={r.slug} a={r} />)}</div>
        </section>
      )}
    </div>
  );
}
