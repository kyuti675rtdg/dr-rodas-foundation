
import Link from "next/link";
import { ArrowRight, BookOpen, Eye, GraduationCap, Landmark, ScrollText, ShieldCheck } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";
import { CAMPAIGNS, money } from "@/lib/data";
export default function Home() {
  const featured = CAMPAIGNS.filter((c) => c.featured);
  const totalTarget = CAMPAIGNS.reduce((s, c) => s + c.target, 0);
  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,#a8a29e_1px,transparent_0)] [background-size:26px_26px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">Dr. Rodas Foundation · Museum</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">Preserve the past.<br />Inspire every generation.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300">Your gift protects fragile collections, brings exhibitions to life, and opens the museum's learning programs to schools and communities — with every campaign's progress and spending published openly.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/donate" className="rounded-full bg-gold px-7 py-3.5 font-semibold text-white hover:bg-gold-light">Donate Now</Link>
            <Link href="/campaigns" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-semibold hover:border-gold-light hover:text-gold-light">Explore Campaigns <ArrowRight size={17} /></Link>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8 text-center sm:text-left">
            <div><dt className="text-xs uppercase tracking-widest text-neutral-400">Active campaigns</dt><dd className="mt-1 font-serif text-3xl font-semibold">{CAMPAIGNS.length}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-neutral-400">Combined goal</dt><dd className="mt-1 font-serif text-3xl font-semibold">{money(totalTarget)}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-neutral-400">Reporting</dt><dd className="mt-1 font-serif text-3xl font-semibold">Public</dd></div>
          </dl>
          <p className="mt-6 max-w-2xl text-xs leading-5 text-neutral-500">Development preview: campaign figures shown in preview mode are seed values (currently zero raised). Live totals come only from confirmed donations in the foundation's system.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our Mission</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">A museum kept alive by the people who love it</h2>
            <p className="mt-4 leading-7 text-neutral-600"><strong className="text-navy">Mission:</strong> to collect, preserve and interpret cultural heritage — and to make history, art and learning accessible to everyone, free from barriers of income or geography.</p>
            <p className="mt-3 leading-7 text-neutral-600"><strong className="text-navy">Vision:</strong> a living museum where every generation discovers where it comes from, cares for what remains, and creates what comes next.</p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-dark">More about the foundation <ArrowRight size={16} /></Link></div>
          <div className="grid grid-cols-2 gap-4">
            {[[Landmark,"Preservation","Conservation and safe storage for at-risk collections."],[BookOpen,"Exhibitions","Galleries and travelling shows that tell our shared story."],[GraduationCap,"Education","Free learning labs and programs for schools and families."],[ScrollText,"Archives","Digitized records the whole world can explore."]].map(([Icon, t, d]) => {
              const I = Icon as typeof Landmark; return (
              <div key={t as string} className="rounded-3xl border border-mist bg-white p-5"><I className="text-gold" /><h3 className="mt-3 font-serif text-lg font-semibold">{t as string}</h3><p className="mt-1 text-sm leading-6 text-neutral-600">{d as string}</p></div>);})}
          </div>
        </div>
      </section>

      <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Featured Campaigns</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">Where your gift goes to work</h2></div>
          <Link href="/campaigns" className="inline-flex items-center gap-2 font-semibold text-gold">All campaigns <ArrowRight size={16} /></Link></div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">{featured.map((c) => <CampaignCard key={c.slug} c={c} />)}</div>
      </div></section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-navy p-8 text-white sm:p-12">
          <div className="flex items-center gap-3"><Eye className="text-gold-light" /><h2 className="font-serif text-2xl font-semibold sm:text-3xl">Giving you can verify</h2></div>
          <p className="mt-3 max-w-3xl leading-7 text-neutral-300">Campaign totals count confirmed donations only. Fees, refunds, allocations and disbursements are tracked separately, approved through a finance workflow, and summarised publicly — without ever exposing a donor's private information.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/transparency" className="rounded-full bg-white px-6 py-3 font-semibold text-navy hover:bg-ivory">View Financial Transparency</Link>
            <Link href="/updates" className="rounded-full border border-white/25 px-6 py-3 font-semibold hover:border-gold-light hover:text-gold-light">Read Campaign Updates</Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-neutral-400"><ShieldCheck size={14} /> Donations are recorded with unique references and receipts; refunds reverse progress through recorded transactions, never silent edits.</p>
        </div>
      </section>
    </div>
  );
}
