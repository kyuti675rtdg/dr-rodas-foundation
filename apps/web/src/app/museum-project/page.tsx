import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NEWS } from "@/lib/data";
import { CategoriesTable, FundraisingSummary } from "@/components/Fundraising";
import { PageOpening, Rubric } from "@/components/Editorial";
import Reveal from "@/components/Reveal";
import { NewsCard } from "../news/NewsClient";

export const metadata: Metadata = {
  title: "Museum Project",
  description: "The Dr. Rodas Museum Project — Discovering Ethiopia’s Intellectual Heritage. Preserving Knowledge for the Future.",
  openGraph: { title: "Museum Project · Dr. Rodas Foundation", description: "Discovering Ethiopia’s Intellectual Heritage. Preserving Knowledge for the Future.", images: ["/logo.png"] },
};

const AREAS = [
  ["Ge’ez Language and Manuscript Heritage", "Explore the Ge’ez language, script, historical manuscripts, literary traditions, and their importance in Ethiopian history, scholarship, and religious and cultural life."],
  ["Gematria and Numerical Traditions", "Present the history and cultural significance of numerical values associated with letters, traditional numerical systems, and related Ethiopian intellectual traditions. Exhibitions will distinguish documented historical evidence from interpretations and hypotheses."],
  ["Ethiopian Astronomy and Cosmology", "Explore documented Ethiopian astronomical traditions, calendars, timekeeping, observations of the Sun, Moon, and stars, and historical understandings of the cosmos. Historical cosmology will be presented in its cultural context and distinguished from modern scientific astronomy."],
  ["Ethiopian History and Intellectual Traditions", "Present historical records, scholarship, cultural developments, and the people and traditions that have contributed to Ethiopia’s intellectual legacy."],
  ["Research, Archives, and Digital Preservation", "Support the responsible documentation, digitization, preservation, and study of manuscripts, historical records, and cultural resources, subject to ownership rights and conservation requirements."],
  ["Education and Interactive Learning", "Develop educational exhibitions, guided learning experiences, digital displays, workshops, and research-oriented activities for students, families, educators, and visitors."],
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
      <PageOpening
        rubric="Dr. Rodas Foundation · A major initiative"
        title="The Dr. Rodas Museum Project"
        lede="Discovering Ethiopia’s Intellectual Heritage. Preserving Knowledge for the Future."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={64} height={64} className="h-16 w-16 rounded-full bg-white object-contain ring-1 ring-gold/60" />
          <div className="flex flex-wrap gap-3">
            <Link href="/donate" className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-gold-dark">Donate to the Museum Project</Link>
            <Link href="/publications" className="link-sweep min-h-12 content-center font-semibold text-gold-dark">Explore Publications</Link>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-5 text-navy/55">Planned vs. completed: every stage below is labelled. Proposed facilities and concepts are never represented as already built, and fundraising figures count confirmed donations only.</p>
      </PageOpening>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <Rubric>About the Museum Project</Rubric>
            <div className="mt-4 max-w-2xl space-y-4 leading-7 text-navy/70">
              <p>The Dr. Rodas Museum Project is a major initiative of Dr. Rodas Foundation envisioned as a center for preserving, studying, and presenting Ethiopia&rsquo;s rich intellectual, historical, scientific, and cultural heritage.</p>
              <p>The proposed museum aims to connect historical knowledge with contemporary research, education, exhibitions, and digital technology. It will provide opportunities for visitors, students, researchers, and international audiences to explore Ethiopia&rsquo;s manuscripts, languages, traditions, scientific ideas, and contributions to human knowledge.</p>
              <p>Through carefully developed exhibitions, research resources, educational programs, and digital experiences, the project seeks to make Ethiopian heritage more accessible and meaningful to future generations.</p>
            </div>
            <h2 className="mt-10 font-serif text-2xl font-medium text-navy">Our Vision</h2>
            <p className="mt-3 max-w-2xl font-serif text-xl leading-relaxed text-navy/85 italic">To develop a distinctive museum and learning environment that celebrates Ethiopia&rsquo;s intellectual heritage, supports scholarly research, and connects historical knowledge with contemporary education and global understanding.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <figure>
              <div className="group overflow-hidden border border-line">
                <Image
                  src="/images/garima-gospels-conservation.jpg"
                  alt="The Garima Gospels manuscript after conservation work supported by the Ethiopian Heritage Fund"
                  width={900} height={600}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-5 text-navy/55">The Garima Gospels following conservation — the kind of preservation work this project exists to support. Public domain, via Wikimedia Commons.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section id="areas" className="scroll-mt-20 bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <Rubric>Inside the proposed museum</Rubric>
            <h2 className="mt-3 font-serif text-3xl font-medium text-navy sm:text-4xl">Proposed Exhibition and Research Areas</h2>
            <div className="rule-gold mt-6" aria-hidden />
          </Reveal>
          <div>
            {AREAS.map(([t, d], i) => (
              <div key={t} className="grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
                <p aria-hidden className="font-serif text-lg text-gold-dark sm:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-serif text-xl font-medium text-navy sm:col-span-4">{t}</h3>
                <p className="leading-7 text-navy/65 sm:col-span-7">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Rubric>Why it matters</Rubric>
            <h2 className="mt-3 font-serif text-3xl font-medium text-navy">Why This Project Matters</h2>
            <div className="mt-4 space-y-4 leading-7 text-navy/70">
              <p>Ethiopia has a rich and diverse heritage of languages, manuscripts, scholarship, cultural traditions, and historical knowledge. Preserving this heritage helps future generations understand their history while enabling researchers and wider audiences to engage with these resources.</p>
              <p>The Dr. Rodas Museum Project aims to contribute to this work by creating opportunities for preservation, learning, research, and public engagement.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Rubric>Your donation</Rubric>
            <h2 className="mt-3 font-serif text-3xl font-medium text-navy">What Your Donation Can Support</h2>
            <p className="mt-4 leading-7 text-navy/70">Subject to the foundation&rsquo;s approved fundraising plan, contributions may support:</p>
            <ul className="mt-4">
              {SUPPORT_ITEMS.map((s) => (
                <li key={s} className="flex gap-3 border-b border-line py-3 leading-7 text-navy/70">
                  <span aria-hidden className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{s}
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-7 text-navy/70">Each approved funding category should have a transparent target, verified donations received, remaining amount, and progress indicator on the website.</p>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <Rubric>How it will be built</Rubric>
            <h2 className="mt-3 font-serif text-3xl font-medium text-navy">Our Development Approach</h2>
            <p className="mt-4 max-w-3xl leading-7 text-navy/70">The project will progress through defined stages, which may include planning, research, design, fundraising, infrastructure development, exhibition preparation, and implementation. Official timelines and completed milestones will be published when confirmed by the foundation.</p>
          </Reveal>
          <ol className="mt-8">
            {STAGES.map((s, i) => (
              <li key={s.stage} className="grid gap-2 border-t border-line py-5 sm:grid-cols-12 sm:gap-6">
                <p className="font-serif text-lg text-gold-dark sm:col-span-1"><span className="sr-only">Stage {i + 1}:</span><span aria-hidden>{String(i + 1).padStart(2, "0")}</span></p>
                <div className="sm:col-span-4">
                  <h3 className="font-serif text-xl font-medium text-navy">{s.stage}</h3>
                  <span className="mt-1 inline-block border border-gold/50 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-gold-dark uppercase">{s.status}</span>
                </div>
                <p className="leading-7 text-navy/65 sm:col-span-7">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <FundraisingSummary />
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Funding categories</h2>
          <p className="mt-2 max-w-3xl leading-7 text-navy/65">Approved funding categories will be managed by foundation administrators. The table below is the proposed seed configuration; amounts raised count confirmed donations only.</p>
          <div className="mt-5"><CategoriesTable /></div>
        </div>
        <Reveal>
          <div className="mt-16 border-t border-line pt-12 text-center">
            <h2 className="font-serif text-3xl font-medium text-navy sm:text-4xl">Help Bring the Museum Project to Life</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-navy/65">Your support can help preserve Ethiopia&rsquo;s intellectual heritage, create educational opportunities, and establish resources for future generations.</p>
            <p className="mx-auto mt-2 max-w-2xl leading-7 text-navy/65">Every contribution should be handled securely and reported transparently.</p>
            <Link href="/donate" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-gold px-8 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-gold-dark">Donate to the Museum Project</Link>
            <p className="mt-5 text-sm text-navy/55">View the fundraising target, verified donations, category-level progress, and recent contributions on our dedicated donation page.</p>
            <p className="mt-2 text-sm text-navy/55">Website: <a href="https://drrodas.org" className="link-sweep font-semibold text-gold-dark">https://drrodas.org</a> · Email: <a href="mailto:support@drrodas.org" className="link-sweep font-semibold text-gold-dark">support@drrodas.org</a></p>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Related project news</h2>
          <div className="mt-4 grid gap-x-12 lg:grid-cols-2">{related.map((a) => <NewsCard key={a.slug} a={a} />)}</div>
        </section>
      )}
    </div>
  );
}
