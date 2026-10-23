import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Archive, GraduationCap, History, ScrollText, Sparkles, Telescope } from "lucide-react";
import { NEWS } from "@/lib/data";
import { CategoriesTable, FundraisingSummary } from "@/components/Fundraising";
import { NewsCard } from "../news/NewsClient";

export const metadata: Metadata = {
  title: "Museum Project",
  description: "The Dr. Rodas Museum Project — Discovering Ethiopia’s Intellectual Heritage. Preserving Knowledge for the Future.",
  openGraph: { title: "Museum Project · Dr. Rodas Foundation", description: "Discovering Ethiopia’s Intellectual Heritage. Preserving Knowledge for the Future.", images: ["/logo.png"] },
};

const AREAS = [
  [ScrollText, "1. Ge’ez Language and Manuscript Heritage", "Explore the Ge’ez language, script, historical manuscripts, literary traditions, and their importance in Ethiopian history, scholarship, and religious and cultural life."],
  [Sparkles, "2. Gematria and Numerical Traditions", "Present the history and cultural significance of numerical values associated with letters, traditional numerical systems, and related Ethiopian intellectual traditions. Exhibitions will distinguish documented historical evidence from interpretations and hypotheses."],
  [Telescope, "3. Ethiopian Astronomy and Cosmology", "Explore documented Ethiopian astronomical traditions, calendars, timekeeping, observations of the Sun, Moon, and stars, and historical understandings of the cosmos. Historical cosmology will be presented in its cultural context and distinguished from modern scientific astronomy."],
  [History, "4. Ethiopian History and Intellectual Traditions", "Present historical records, scholarship, cultural developments, and the people and traditions that have contributed to Ethiopia’s intellectual legacy."],
  [Archive, "5. Research, Archives, and Digital Preservation", "Support the responsible documentation, digitization, preservation, and study of manuscripts, historical records, and cultural resources, subject to ownership rights and conservation requirements."],
  [GraduationCap, "6. Education and Interactive Learning", "Develop educational exhibitions, guided learning experiences, digital displays, workshops, and research-oriented activities for students, families, educators, and visitors."],
] as const;

const STAGES = [
  { stage: "Planning", status: "Planned", done: false, detail: "Project planning — official timelines will be published when confirmed by the foundation." },
  { stage: "Research", status: "Planned", done: false, detail: "Research stage — no milestone is presented as completed." },
  { stage: "Design", status: "Planned", done: false, detail: "Design stage — approved concepts will be published only when confirmed, and always labelled as concepts, never as built facilities." },
  { stage: "Fundraising", status: "Planned", done: false, detail: "Fundraising stage — categories below are proposed pending foundation approval. Raised counts confirmed donations only (currently 0)." },
  { stage: "Infrastructure development", status: "Planned", done: false, detail: "No construction is claimed. This stage begins only after verified funding and approvals." },
  { stage: "Exhibition preparation", status: "Planned", done: false, detail: "Exhibition preparation follows the preceding stages." },
  { stage: "Implementation", status: "Planned", done: false, detail: "Implementation and public programs launch after the preceding stages are verifiably complete." },
] as const;

const SUPPORT_ITEMS = [
  "Museum infrastructure and essential facilities.",
  "Exhibition planning and development.",
  "Manuscript preservation and documentation.",
  "Digital archives and preservation technology.",
  "Research and educational facilities.",
  "Learning programs and public engagement.",
  "Museum equipment and visitor experiences.",
];

export default function MuseumProject() {
  const related = NEWS.filter((a) => a.category === "Museum Project Updates" || a.category === "Fundraising Campaigns");
  return (
    <div>
      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
          <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={160} height={160} className="h-36 w-36 shrink-0 rounded-full bg-white object-contain ring-2 ring-gold/60 lg:h-40 lg:w-40" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">Dr. Rodas Foundation · Major Initiative</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">The Dr. Rodas Museum Project</h1>
            <p className="mt-3 font-serif text-xl text-gold-light">Discovering Ethiopia’s Intellectual Heritage. Preserving Knowledge for the Future.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/donate" className="rounded-full bg-gold px-7 py-3.5 font-semibold text-white hover:bg-gold-dark">Donate to the Museum Project</Link>
              <Link href="/publications" className="rounded-full border border-white/40 px-7 py-3.5 font-semibold hover:border-gold-light hover:text-gold-light">Explore Publications</Link>
            </div>
            <p className="mt-5 max-w-3xl text-xs leading-5 text-neutral-400">Planned vs. completed: every stage below is labelled. Proposed facilities and concepts are never represented as already built, and fundraising figures count confirmed donations only.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">About the Museum Project</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">About the Museum Project</h2>
        <div className="mt-4 space-y-4 leading-7 text-neutral-600">
          <p>The Dr. Rodas Museum Project is a major initiative of Dr. Rodas Foundation envisioned as a center for preserving, studying, and presenting Ethiopia’s rich intellectual, historical, scientific, and cultural heritage.</p>
          <p>The proposed museum aims to connect historical knowledge with contemporary research, education, exhibitions, and digital technology. It will provide opportunities for visitors, students, researchers, and international audiences to explore Ethiopia’s manuscripts, languages, traditions, scientific ideas, and contributions to human knowledge.</p>
          <p>Through carefully developed exhibitions, research resources, educational programs, and digital experiences, the project seeks to make Ethiopian heritage more accessible and meaningful to future generations.</p>
          <h3 className="pt-2 font-serif text-2xl font-semibold text-navy">Our Vision</h3>
          <p>To develop a distinctive museum and learning environment that celebrates Ethiopia’s intellectual heritage, supports scholarly research, and connects historical knowledge with contemporary education and global understanding.</p>
        </div>
      </section>

      <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Proposed Exhibition and Research Areas</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">Proposed Exhibition and Research Areas</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(([Icon, t, d]) => { const I = Icon as typeof ScrollText; return (
            <div key={t} className="rounded-3xl border border-mist bg-ivory/60 p-5"><I className="text-gold" /><h3 className="mt-3 font-serif text-lg font-semibold text-navy">{t}</h3><p className="mt-1 text-sm leading-6 text-neutral-600">{d}</p></div>); })}
        </div>
      </div></section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-navy">Why This Project Matters</h2>
        <div className="mt-4 space-y-4 leading-7 text-neutral-600">
          <p>Ethiopia has a rich and diverse heritage of languages, manuscripts, scholarship, cultural traditions, and historical knowledge. Preserving this heritage helps future generations understand their history while enabling researchers and wider audiences to engage with these resources.</p>
          <p>The Dr. Rodas Museum Project aims to contribute to this work by creating opportunities for preservation, learning, research, and public engagement.</p>
        </div>

        <h2 className="mt-10 font-serif text-3xl font-semibold text-navy">What Your Donation Can Support</h2>
        <p className="mt-4 leading-7 text-neutral-600">Subject to the foundation’s approved fundraising plan, contributions may support:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-neutral-600">
          {SUPPORT_ITEMS.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <p className="mt-4 leading-7 text-neutral-600">Each approved funding category should have a transparent target, verified donations received, remaining amount, and progress indicator on the website.</p>

        <h2 className="mt-10 font-serif text-3xl font-semibold text-navy">Our Development Approach</h2>
        <p className="mt-4 leading-7 text-neutral-600">The project will progress through defined stages, which may include planning, research, design, fundraising, infrastructure development, exhibition preparation, and implementation. Official timelines and completed milestones will be published when confirmed by the foundation.</p>
        <ol className="mt-5 space-y-3">
          {STAGES.map((s, i) => (
            <li key={s.stage} className="rounded-2xl border border-mist bg-white p-4">
              <p className="flex flex-wrap items-center gap-2 font-semibold text-navy"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy font-serif text-sm text-gold-light">{i + 1}</span> {s.stage}
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${s.done ? "bg-emerald-100 text-emerald-800" : "bg-ivory text-gold-dark"}`}>{s.status}</span></p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{s.detail}</p>
            </li>))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 pb-16 sm:px-6">
        <FundraisingSummary />
        <div><h2 className="font-serif text-2xl font-semibold text-navy">Funding categories</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Approved funding categories will be managed by foundation administrators. The table below is the proposed seed configuration; amounts raised count confirmed donations only.</p>
          <div className="mt-5"><CategoriesTable /></div></div>
        <div className="rounded-3xl bg-navy p-8 text-center text-white sm:p-10">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Help Bring the Museum Project to Life</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-neutral-300">Your support can help preserve Ethiopia’s intellectual heritage, create educational opportunities, and establish resources for future generations.</p>
          <p className="mx-auto mt-2 max-w-2xl leading-7 text-neutral-300">Every contribution should be handled securely and reported transparently.</p>
          <Link href="/donate" className="mt-6 inline-block rounded-full bg-gold px-8 py-3.5 font-semibold text-white hover:bg-gold-dark">Donate to the Museum Project</Link>
          <p className="mt-4 text-sm text-neutral-400">View the fundraising target, verified donations, category-level progress, and recent contributions on our dedicated donation page.</p>
          <p className="mt-2 text-sm text-neutral-400">Website: <a href="https://drrodas.org" className="text-gold-light">https://drrodas.org</a> · Email: <a href="mailto:support@drrodas.org" className="text-gold-light">support@drrodas.org</a></p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-navy">Related project news</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">{related.map((a) => <NewsCard key={a.slug} a={a} />)}</div>
        </section>)}
    </div>
  );
}
