import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Mail, ShieldCheck } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";
import Reveal from "@/components/Reveal";
import { Rubric, SectionHeading } from "@/components/Editorial";
import { CAMPAIGNS, NEWS, PUBLICATIONS, money, progress } from "@/lib/data";
import { ProgressBar } from "@/components/CampaignCard";
import { RecentDonations } from "@/components/Fundraising";
import { PublicationRow } from "./publications/PublicationsClient";
import { NewsCard } from "./news/NewsClient";

const PROGRAMS = [
  ["Research and Documentation", "Support the study, documentation, and preservation of historical records, manuscripts, and cultural knowledge.", "/about"],
  ["Education and Knowledge Sharing", "Educational materials, public programs, and learning opportunities for students, researchers, and communities.", "/about"],
  ["Publications and Digital Resources", "Approved research, books, articles, reports, and educational materials, shared openly.", "/publications"],
  ["Cultural Heritage Preservation", "Awareness of Ethiopia’s historical achievements, languages, traditions, and intellectual contributions.", "/about"],
  ["Museum Development", "The Dr. Rodas Museum Project — heritage preservation, research, exhibitions, and public education.", "/museum-project"],
  ["Digital Innovation", "Responsible uses of digital technology to preserve knowledge and expand access to it.", "/about"],
] as const;

/* The six official exhibition areas, in the order of docs/OFFICIAL-CONTENT.md.
   Each line is a tight paraphrase of the official description — no new claims. */
const AREAS = [
  ["Ge’ez Language and Manuscript Heritage", "The Ge’ez language, script, and historical manuscripts, and their importance in Ethiopian scholarship and cultural life."],
  ["Gematria and Numerical Traditions", "Numerical values associated with letters and traditional systems — documented evidence kept distinct from interpretation."],
  ["Ethiopian Astronomy and Cosmology", "Documented astronomical traditions, calendars, and timekeeping, presented in their cultural context."],
  ["Ethiopian History and Intellectual Traditions", "Historical records, scholarship, and the people and traditions behind Ethiopia’s intellectual legacy."],
  ["Research, Archives, and Digital Preservation", "Responsible documentation, digitization, and study of manuscripts and historical records."],
  ["Education and Interactive Learning", "Educational exhibitions, digital displays, and workshops for students, families, educators, and visitors."],
] as const;

const GIVING_STEPS = [
  ["Choose", "Choose a campaign or the Museum Project fund you would like to support."],
  ["Give securely", "Give securely — payment methods activate once the foundation’s merchant accounts are verified."],
  ["See it reported", "See it reported — totals count confirmed donations only and are published on the Transparency page."],
] as const;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dr. Rodas Foundation",
  url: "https://drrodas.org",
  logo: "https://drrodas.org/logo.png",
  email: "support@drrodas.org",
};

export default function Home() {
  const featured = CAMPAIGNS.filter((c) => c.featured);
  const museum = CAMPAIGNS[0];
  const featuredPubs = PUBLICATIONS.filter((p) => p.featured);
  const latestNews = NEWS.slice(0, 3);
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Hero — the one memorable moment: an oversized serif headline, the
          foundation medallion, and a real Garima Gospels folio. Quiet else. */}
      <section>
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:pt-20">
          <Reveal>
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={56} height={56} priority className="h-14 w-14 rounded-full bg-white object-contain ring-1 ring-gold/60" />
              <p className="text-sm text-navy/60">ዶክተር ሮዳስ ፋውንዴሽን · Dr. Rodas Foundation</p>
            </div>
            <div aria-hidden className="mt-10 h-px w-28 bg-gold" />
            <h1 className="mt-6 max-w-4xl font-serif text-[2.6rem] leading-[1.05] font-medium text-navy sm:text-6xl sm:leading-[1.04] lg:text-7xl">
              Preserving Heritage.<br />Advancing Knowledge.<br />Inspiring Generations.
            </h1>
            <p lang="am" className="mt-5 font-serif text-xl text-navy/55 sm:text-2xl">ዶክተር ሮዳስ ፋውንዴሽን</p>
            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <figure className="lg:col-span-7">
                <div className="relative">
                  <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/50" />
                  <div className="relative border border-line bg-parchment p-2.5 sm:p-3">
                    <div className="group overflow-hidden">
                      <Image
                        src="/images/garima-gospels-folio.jpg"
                        alt="Illuminated folio from the Garima Gospels, one of the oldest surviving Ethiopian illuminated manuscripts"
                        width={1350} height={1743}
                        priority
                        className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[16/10]"
                      />
                    </div>
                  </div>
                </div>
                <figcaption className="mt-4 text-xs leading-5 text-navy/55">
                  A folio of the Garima Gospels — among the world&rsquo;s oldest illuminated Christian manuscripts, written in Ge&rsquo;ez and preserved in Ethiopia. Public domain, via Wikimedia Commons.
                </figcaption>
              </figure>
              <div className="lg:col-span-5 lg:pt-2">
                <p className="text-lg leading-8 text-navy/75">
                  Dr. Rodas Foundation is dedicated to preserving, documenting, researching, and sharing Ethiopian intellectual, historical, and cultural heritage. Through education, research, publications, cultural initiatives, and digital innovation, the foundation seeks to make Ethiopia&rsquo;s rich knowledge traditions accessible to present and future generations.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/donate" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-7 py-3 font-semibold text-white transition-colors duration-300 hover:bg-gold-dark sm:w-auto">Donate Now</Link>
                  <Link href="/museum-project" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-navy/25 px-7 py-3 font-semibold text-navy transition-colors duration-300 hover:border-gold hover:text-gold-dark sm:w-auto">Explore the Museum Project</Link>
                </div>
                <p className="mt-8 border-t border-line pt-5 text-xs leading-5 text-navy/55">
                  Development preview: figures shown in preview mode are seed values (currently zero raised). Live totals come only from confirmed donations in the foundation&rsquo;s system.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Trust strip — why a gift here can be believed */}
          <div className="mt-14 grid gap-4 border-y border-line py-5 sm:grid-cols-3 sm:gap-6">
            <Link href="/transparency" className="flex min-h-11 items-center gap-3 text-sm text-navy/70 transition-colors hover:text-navy">
              <ShieldCheck size={18} aria-hidden className="shrink-0 text-gold-dark" />
              Transparent fundraising — published totals
            </Link>
            <p className="flex min-h-11 items-center gap-3 text-sm text-navy/70">
              <BadgeCheck size={18} aria-hidden className="shrink-0 text-gold-dark" />
              Confirmed donations only
            </p>
            <a href="mailto:support@drrodas.org" className="flex min-h-11 items-center gap-3 text-sm text-navy/70 transition-colors hover:text-navy">
              <Mail size={18} aria-hidden className="shrink-0 text-gold-dark" />
              support@drrodas.org
            </a>
          </div>
        </div>

        {/* Explore bar — the four key destinations, on ivory */}
        <nav aria-label="Explore the foundation" className="mt-14 border-t border-line bg-ivory">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-9 gap-y-2 px-4 py-4 sm:px-6">
            <span className="text-xs font-semibold tracking-[0.18em] text-navy/50 uppercase">Explore</span>
            <Link href="/museum-project" className="link-sweep text-sm font-semibold text-navy">Museum Project</Link>
            <Link href="/publications" className="link-sweep text-sm font-semibold text-navy">Publications</Link>
            <Link href="/news" className="link-sweep text-sm font-semibold text-navy">News</Link>
            <Link href="/about" className="link-sweep text-sm font-semibold text-navy">About</Link>
          </div>
        </nav>
      </section>

      {/* Mission & vision — official text */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Rubric>Our Mission</Rubric>
            <p className="mt-4 font-serif text-2xl leading-snug font-medium text-navy sm:text-[2rem] sm:leading-[1.3]">
              To preserve and advance Ethiopian intellectual and cultural heritage through research, education, documentation, publications, and innovative technologies.
            </p>
            <p className="mt-6 max-w-xl leading-7 text-navy/65">
              The foundation promotes the study of Ethiopian history, languages, manuscripts, philosophy, astronomy, and traditional systems of knowledge while encouraging research, public engagement, and international collaboration.
            </p>
            <Link href="/about" className="link-sweep mt-6 inline-block font-semibold text-gold-dark">More about the foundation</Link>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="border-l-2 border-gold/70 pl-6">
              <Rubric>Our Vision</Rubric>
              <p className="mt-4 font-serif text-xl leading-relaxed text-navy/85 italic">
                To become a respected institution connecting Ethiopia&rsquo;s rich heritage with global scholarship, contemporary learning, and future generations.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Museum project feature — asymmetric editorial split */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <SectionHeading rubric="The Museum Project" title="A museum for Ethiopia’s intellectual heritage" href="/museum-project" hrefLabel="Explore the Museum Project" />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <div className="group overflow-hidden border border-line">
                <Image
                  src="/images/geez-manuscript-page.jpg"
                  alt="A page of Ge'ez manuscript writing from an Ethiopian prayer book"
                  width={2192} height={2384}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-3 text-xs leading-5 text-navy/55">Ge&rsquo;ez manuscript page, Ethiopian prayer book. Public domain, via Wikimedia Commons.</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <h3 className="font-serif text-2xl font-medium text-navy">{museum.title}</h3>
              <p className="mt-3 max-w-xl leading-7 text-navy/65">{museum.summary}</p>
              <div className="mt-8 max-w-xl">
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <span className="font-semibold text-navy">{money(museum.raised, museum.currency)} raised</span>
                  <span className="text-navy/55">of {money(museum.target, museum.currency)} goal</span>
                </div>
                <div className="mt-2.5"><ProgressBar value={progress(museum)} /></div>
                <p className="mt-2.5 text-xs text-navy/55">{progress(museum)}% funded · confirmed donations only</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/donate" className="inline-flex min-h-12 items-center rounded-full bg-navy px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-navy-2">Donate to the Museum</Link>
                <Link href="/museum-project" className="link-sweep min-h-12 content-center font-semibold text-gold-dark">How the project unfolds</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Exhibition areas preview — the six official areas, in official order */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeading rubric="Inside the proposed museum" title="Six areas of exploration" href="/museum-project#areas" hrefLabel="Visit the Museum Project" />
        <div className="mt-4 grid gap-x-14 md:grid-cols-2">
          {AREAS.map(([t, d], i) => (
            <Reveal key={t}>
              <div className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-6">
                <p aria-hidden className="font-serif text-lg text-gold-dark">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="font-serif text-xl font-medium text-navy">{t}</h3>
                  <p className="mt-1.5 leading-7 text-navy/65">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs — ruled rows, official program text */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeading rubric="What the foundation does" title="Programs and initiatives" href="/about" hrefLabel="All programs" />
        <div className="mt-4">
          {PROGRAMS.map(([t, d, href]) => (
            <Reveal key={t}>
              <div className="group grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
                <h3 className="font-serif text-xl font-medium text-navy sm:col-span-4">{t}</h3>
                <p className="leading-7 text-navy/65 sm:col-span-6">{d}</p>
                <div className="sm:col-span-2 sm:text-right">
                  <Link href={href} className="link-sweep text-sm font-semibold text-gold-dark">Read more</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How giving works — a true three-step sequence */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <SectionHeading rubric="Donate" title="How giving works" />
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            {GIVING_STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="border-t-2 border-gold/60 pt-5">
                  <p className="font-serif text-lg text-gold-dark"><span className="sr-only">Step {i + 1}:</span><span aria-hidden>{String(i + 1).padStart(2, "0")}</span></p>
                  <h3 className="mt-2 font-serif text-xl font-medium text-navy">{t}</h3>
                  <p className="mt-2 leading-7 text-navy/65">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/donate" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-navy px-7 py-3 font-semibold text-white transition-colors duration-300 hover:bg-navy-2 sm:w-auto">Donate Now</Link>
            <Link href="/transparency" className="link-sweep min-h-12 content-center text-center font-semibold text-gold-dark sm:text-left">View financial transparency</Link>
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-24">
        <SectionHeading rubric="Fundraising campaigns" title="Where your gift goes to work" href="/campaigns" hrefLabel="All campaigns" />
        <div className="grid gap-x-12 md:grid-cols-2">
          {featured.map((c) => <CampaignCard key={c.slug} c={c} />)}
        </div>
      </section>

      {/* Publications — reading-room rows */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <SectionHeading rubric="Publications" title="From the digital library" href="/publications" hrefLabel="Browse the library" />
          <div>
            {featuredPubs.map((p) => <PublicationRow key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeading rubric="News" title="Foundation news &amp; announcements" href="/news" hrefLabel="All news" />
        <div className="grid gap-x-12 lg:grid-cols-3">
          {latestNews.map((a) => <NewsCard key={a.slug} a={a} />)}
        </div>
      </section>

      {/* Commitment — a pull-quote from the official Our Commitment text */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal>
            <Rubric>Our Commitment</Rubric>
            <blockquote className="mt-6 max-w-4xl">
              <p className="font-serif text-3xl leading-snug font-medium text-navy italic sm:text-4xl lg:text-[2.75rem] lg:leading-[1.25]">
                &ldquo;Preserving heritage is an investment in the future.&rdquo;
              </p>
              <p className="mt-6 max-w-2xl leading-7 text-navy/65">
                By connecting historical knowledge with education, research, and technology, Dr. Rodas Foundation aims to help future generations understand, appreciate, and build upon Ethiopia&rsquo;s intellectual and cultural legacy.
              </p>
            </blockquote>
            <Link href="/about" className="link-sweep mt-7 inline-block font-semibold text-gold-dark">About the foundation</Link>
          </Reveal>
        </div>
      </section>

      {/* Recent donations + verification, then the single navy band */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-24">
        <RecentDonations />
        <Reveal>
          <div className="mt-14 bg-navy px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold-light uppercase"><ShieldCheck size={15} aria-hidden /> Giving you can verify</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight font-medium sm:text-4xl">Every gift, accounted for in public.</h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/70">Campaign totals count confirmed donations only. Fees, refunds, allocations and disbursements are tracked separately, approved through a finance workflow, and summarised publicly — without ever exposing a donor&rsquo;s private information.</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-4 lg:col-span-4 lg:items-end">
                <Link href="/donate" className="inline-flex min-h-12 items-center rounded-full bg-gold px-7 py-3 font-semibold text-white transition-colors duration-300 hover:bg-gold-dark">Donate Now</Link>
                <Link href="/transparency" className="link-sweep text-sm font-semibold text-white/85 hover:text-gold-light">View financial transparency</Link>
              </div>
            </div>
            <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-5 text-white/50">Donations are recorded with unique references and receipts; refunds reverse progress through recorded transactions, never silent edits.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
