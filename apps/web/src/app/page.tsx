import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Eye, GraduationCap, Landmark, ScrollText, ShieldCheck } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";
import { CAMPAIGNS, NEWS, PUBLICATIONS, money, progress } from "@/lib/data";
import { ProgressBar } from "@/components/CampaignCard";
import { RecentDonations } from "@/components/Fundraising";
import { PublicationCard } from "./publications/PublicationsClient";
import { NewsCard } from "./news/NewsClient";

export default function Home() {
  const featured = CAMPAIGNS.filter((c) => c.featured);
  const museum = CAMPAIGNS[0];
  const totalTarget = CAMPAIGNS.reduce((s, c) => s + c.target, 0);
  const totalRaised = CAMPAIGNS.reduce((s, c) => s + c.raised, 0);
  const pct = totalTarget > 0 ? Math.round((totalRaised / totalTarget) * 1000) / 10 : 0;
  const featuredPubs = PUBLICATIONS.filter((p) => p.featured);
  const latestNews = NEWS.slice(0, 3);
  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,#D9B45B_1px,transparent_0)] [background-size:26px_26px]" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:py-28">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">Dr. Rodas Foundation · Museum</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">Preserving Heritage.<br />Advancing Knowledge.<br />Inspiring Generations.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300">Dr. Rodas Foundation is dedicated to preserving, documenting, researching, and sharing Ethiopian intellectual, historical, and cultural heritage. Through education, research, publications, cultural initiatives, and digital innovation, the foundation seeks to make Ethiopia’s rich knowledge traditions accessible to present and future generations.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/donate" className="rounded-full bg-gold px-7 py-3.5 font-semibold text-white hover:bg-gold-dark">Donate Now</Link>
              <Link href="/museum-project" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-semibold hover:border-gold-light hover:text-gold-light">Explore Museum Project <ArrowRight size={17} /></Link>
            </div>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8 text-center sm:text-left">
              <div><dt className="text-xs uppercase tracking-widest text-neutral-400">Active campaigns</dt><dd className="mt-1 font-serif text-3xl font-semibold">{CAMPAIGNS.length}</dd></div>
              <div><dt className="text-xs uppercase tracking-widest text-neutral-400">Combined goal</dt><dd className="mt-1 font-serif text-3xl font-semibold">{money(totalTarget)}</dd></div>
              <div><dt className="text-xs uppercase tracking-widest text-neutral-400">Reporting</dt><dd className="mt-1 font-serif text-3xl font-semibold">Public</dd></div>
            </dl>
            <p className="mt-6 max-w-2xl text-xs leading-5 text-neutral-400">Development preview: figures in preview mode are seed values (currently zero raised). Live totals come only from confirmed donations in the foundation&rsquo;s system.</p>
          </div>
          <div className="mx-auto shrink-0 lg:mx-0">
            <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={320} height={320} priority className="h-64 w-64 rounded-full bg-white object-contain shadow-2xl ring-4 ring-gold/50 sm:h-80 sm:w-80" />
            <p className="mt-4 text-center font-serif text-lg text-gold-light">ዶክተር ሮዳስ ፋውንዴሽን</p>
            <p className="text-center text-xs uppercase tracking-[0.22em] text-neutral-400">Dr. Rodas Foundation</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our Mission</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">Preserving Heritage. Advancing Knowledge. Inspiring Generations.</h2>
            <p className="mt-4 leading-7 text-neutral-600"><strong className="text-navy">Mission:</strong> To preserve and advance Ethiopian intellectual and cultural heritage through research, education, documentation, publications, and innovative technologies.</p>
            <p className="mt-3 leading-7 text-neutral-600"><strong className="text-navy">Vision:</strong> To become a respected institution connecting Ethiopia’s rich heritage with global scholarship, contemporary learning, and future generations.</p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-dark">More about the foundation <ArrowRight size={16} /></Link></div>
          <div className="grid grid-cols-2 gap-4">
            {[[Landmark,"Preservation","Conservation and safe storage for at-risk collections."],[BookOpen,"Exhibitions","Galleries and travelling shows that tell our shared story."],[GraduationCap,"Education","Free learning labs and programs for schools and families."],[ScrollText,"Archives","Digitized records the whole world can explore."]].map(([Icon, t, d]) => {
              const I = Icon as typeof Landmark; return (
              <div key={t as string} className="rounded-3xl border border-mist bg-white p-5"><I className="text-gold" /><h3 className="mt-3 font-serif text-lg font-semibold text-navy">{t as string}</h3><p className="mt-1 text-sm leading-6 text-neutral-600">{d as string}</p></div>);})}
          </div>
        </div>
      </section>

      <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Featured · Museum Project</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">Featured Museum Project fundraising</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-mist bg-ivory/60 p-7">
            <h3 className="font-serif text-2xl font-semibold text-navy">{museum.title}</h3>
            <p className="mt-3 leading-7 text-neutral-600">{museum.summary}</p>
            <div className="mt-5 flex justify-between text-sm"><span className="font-bold text-navy">{money(museum.raised, museum.currency)} raised</span><span className="text-neutral-500">of {money(museum.target, museum.currency)}</span></div>
            <div className="mt-2"><ProgressBar value={progress(museum)} /></div>
            <p className="mt-2 text-xs text-neutral-500">{progress(museum)}% funded · confirmed donations only</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/museum-project" className="rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-2">Explore Museum Project</Link>
              <Link href="/donate" className="rounded-full bg-gold px-6 py-3 font-semibold text-white hover:bg-gold-dark">Donate to the Museum</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-mist bg-white p-7">
            <h3 className="font-serif text-2xl font-semibold text-navy">Fundraising summary</h3>
            <dl className="mt-5 grid grid-cols-2 gap-5">
              <div><dt className="text-xs uppercase tracking-widest text-neutral-500">Target</dt><dd className="mt-1 font-serif text-2xl font-semibold text-navy">{money(totalTarget)}</dd></div>
              <div><dt className="text-xs uppercase tracking-widest text-neutral-500">Verified raised</dt><dd className="mt-1 font-serif text-2xl font-semibold text-navy">{money(totalRaised)}</dd></div>
              <div><dt className="text-xs uppercase tracking-widest text-neutral-500">Remaining</dt><dd className="mt-1 font-serif text-2xl font-semibold text-navy">{money(totalTarget - totalRaised)}</dd></div>
              <div><dt className="text-xs uppercase tracking-widest text-neutral-500">Progress</dt><dd className="mt-1 font-serif text-2xl font-semibold text-navy">{pct}%</dd></div>
            </dl>
            <div className="mt-4"><ProgressBar value={pct} /></div>
            <p className="mt-4 text-sm leading-6 text-neutral-600">Impact: gifts fund preservation, exhibitions, education and digital archives — tracked from receipt to result on the <Link href="/transparency" className="font-semibold text-gold">transparency page</Link>.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Featured Campaigns</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">Where your gift goes to work</h2></div>
          <Link href="/campaigns" className="inline-flex items-center gap-2 font-semibold text-gold">All campaigns <ArrowRight size={16} /></Link></div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">{featured.map((c) => <CampaignCard key={c.slug} c={c} />)}</div>
      </div></section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Featured Publications</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">From the digital library</h2></div>
          <Link href="/publications" className="inline-flex items-center gap-2 font-semibold text-gold">All publications <ArrowRight size={16} /></Link></div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredPubs.map((p) => <PublicationCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Latest News</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">News &amp; announcements</h2></div>
          <Link href="/news" className="inline-flex items-center gap-2 font-semibold text-gold">All news <ArrowRight size={16} /></Link></div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{latestNews.map((a) => <NewsCard key={a.slug} a={a} />)}</div>
      </div></section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><RecentDonations /></section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-navy p-8 text-white sm:p-12">
          <div className="flex items-center gap-3"><Eye className="text-gold-light" /><h2 className="font-serif text-2xl font-semibold sm:text-3xl">Giving you can verify</h2></div>
          <p className="mt-3 max-w-3xl leading-7 text-neutral-300">Campaign totals count confirmed donations only. Fees, refunds, allocations and disbursements are tracked separately, approved through a finance workflow, and summarised publicly — without ever exposing a donor&rsquo;s private information.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/transparency" className="rounded-full bg-white px-6 py-3 font-semibold text-navy hover:bg-ivory">View Financial Transparency</Link>
            <Link href="/news" className="rounded-full border border-white/25 px-6 py-3 font-semibold hover:border-gold-light hover:text-gold-light">Read Foundation News</Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-neutral-400"><ShieldCheck size={14} /> Donations are recorded with unique references and receipts; refunds reverse progress through recorded transactions, never silent edits.</p>
        </div>
        <div className="mt-8 rounded-3xl bg-gold p-8 text-center text-white sm:p-10">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Help preserve this heritage</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/90">Your gift — large or small — protects manuscripts and collections, and opens learning to everyone.</p>
          <Link href="/donate" className="mt-6 inline-block rounded-full bg-navy px-8 py-3.5 font-semibold text-white hover:bg-navy-2">Donate Now</Link>
        </div>
      </section>
    </div>
  );
}
