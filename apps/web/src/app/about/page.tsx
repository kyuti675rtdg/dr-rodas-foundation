import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageOpening, Rubric } from "@/components/Editorial";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "About the Foundation", description: "Dr. Rodas Foundation — Preserving Heritage. Advancing Knowledge. Inspiring Generations." };

const OBJECTIVES = [
  "Preserve and document Ethiopia’s historical, intellectual, and cultural heritage.",
  "Support research, publications, and educational initiatives.",
  "Promote Ge’ez language, manuscripts, and traditional knowledge systems.",
  "Encourage the study of Ethiopian astronomy, history, philosophy, and numerical traditions.",
  "Develop digital archives and accessible educational resources.",
  "Establish partnerships with researchers, universities, cultural institutions, and communities.",
  "Support public awareness and intergenerational knowledge transfer.",
];

const PROGRAMS = [
  ["Research and Documentation", "Support the study, documentation, and preservation of historical records, manuscripts, and cultural knowledge."],
  ["Education and Knowledge Sharing", "Develop educational materials, public programs, and learning opportunities for students, researchers, and communities."],
  ["Publications and Digital Resources", "Share approved research, books, articles, reports, and educational materials."],
  ["Cultural Heritage Preservation", "Promote awareness of Ethiopia’s historical achievements, languages, traditions, and intellectual contributions."],
  ["Museum Development", "Advance the Dr. Rodas Museum Project as a major initiative dedicated to heritage preservation, research, exhibitions, and public education."],
  ["Digital Innovation", "Explore responsible uses of digital technology to preserve knowledge and expand access to cultural and educational resources."],
] as const;

export default function About() {
  return (
    <div>
      <PageOpening rubric="About the Foundation" title="Preserving Heritage. Advancing Knowledge. Inspiring Generations." />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <div className="max-w-2xl space-y-5 text-lg leading-8 text-navy/75">
              <p>Dr. Rodas Foundation is dedicated to preserving, documenting, researching, and sharing Ethiopian intellectual, historical, and cultural heritage. Through education, research, publications, cultural initiatives, and digital innovation, the foundation seeks to make Ethiopia&rsquo;s rich knowledge traditions accessible to present and future generations.</p>
              <p>The foundation promotes the study of Ethiopian history, languages, manuscripts, philosophy, astronomy, and traditional systems of knowledge while encouraging research, public engagement, and international collaboration.</p>
            </div>
            <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
              <div>
                <Rubric>Our Mission</Rubric>
                <p className="mt-3 font-serif text-xl leading-relaxed font-medium text-navy">To preserve and advance Ethiopian intellectual and cultural heritage through research, education, documentation, publications, and innovative technologies.</p>
              </div>
              <div>
                <Rubric>Our Vision</Rubric>
                <p className="mt-3 font-serif text-xl leading-relaxed font-medium text-navy">To become a respected institution connecting Ethiopia&rsquo;s rich heritage with global scholarship, contemporary learning, and future generations.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <figure>
              <div className="group overflow-hidden border border-line">
                <Image
                  src="/images/illuminated-manuscript-18th.jpg"
                  alt="An Ethiopian illuminated manuscript from the 18th century, with painted religious scenes and Ge'ez text"
                  width={1390} height={2000}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-5 text-navy/55">Ethiopian illuminated manuscript, 18th century. Public domain, Princeton University Art Museum, via Wikimedia Commons.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <Rubric>Our Core Objectives</Rubric>
            <h2 className="mt-3 font-serif text-3xl font-medium text-navy sm:text-4xl">What the foundation works toward</h2>
          </Reveal>
          <ol className="mt-8 grid gap-x-14 lg:grid-cols-2">
            {OBJECTIVES.map((o, i) => (
              <li key={o} className="flex gap-5 border-b border-line py-5">
                <span aria-hidden className="font-serif text-lg text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                <span className="leading-7 text-navy/75">{o}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-navy/50">The objectives are a stated set of aims — listed in full, as the foundation publishes them.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <Rubric>What We Do</Rubric>
          <h2 className="mt-3 font-serif text-3xl font-medium text-navy sm:text-4xl">Our Programs and Initiatives</h2>
          <div className="rule-gold mt-6" aria-hidden />
        </Reveal>
        <div>
          {PROGRAMS.map(([t, d]) => (
            <div key={t} className="grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
              <h3 className="font-serif text-xl font-medium text-navy sm:col-span-5">{t}</h3>
              <p className="leading-7 text-navy/65 sm:col-span-7">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Rubric>Our Commitment</Rubric>
            <p className="mt-4 max-w-2xl font-serif text-2xl leading-snug font-medium text-navy">
              We believe that preserving heritage is an investment in the future.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-navy/65">By connecting historical knowledge with education, research, and technology, Dr. Rodas Foundation aims to help future generations understand, appreciate, and build upon Ethiopia&rsquo;s intellectual and cultural legacy.</p>
            <h2 className="mt-10 font-serif text-2xl font-medium text-navy">Registration &amp; contact</h2>
            <p className="mt-3 leading-7 text-navy/65">Official registration details will be published on this page once verified by the foundation.</p>
            <p className="mt-2 leading-7 text-navy/65">
              Website: <a className="link-sweep font-semibold text-gold-dark" href="https://drrodas.org">https://drrodas.org</a>
              {" · "}Email: <a className="link-sweep font-semibold text-gold-dark" href="mailto:support@drrodas.org">support@drrodas.org</a>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <figure>
              <div className="group overflow-hidden border border-line">
                <Image
                  src="/images/bete-giyorgis-lalibela.jpg"
                  alt="Bete Giyorgis, the rock-hewn Church of Saint George at Lalibela, carved downward into solid rock in the shape of a cross"
                  width={3297} height={2326}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-5 text-navy/55">Bete Giyorgis, Lalibela — a UNESCO World Heritage Site. Photograph by Bernard Gagnon, CC BY-SA 3.0, via Wikimedia Commons.</figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 border-t border-line pt-12 text-center">
            <h2 className="font-serif text-3xl font-medium text-navy sm:text-4xl">Support Our Mission</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-navy/65">Your contribution can help advance research, preserve valuable knowledge, support educational initiatives, and develop the Dr. Rodas Museum Project.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/donate" className="inline-flex min-h-12 items-center rounded-full bg-gold px-7 py-3 font-semibold text-white transition-colors duration-300 hover:bg-gold-dark">Support the Foundation</Link>
              <Link href="/museum-project" className="inline-flex min-h-12 items-center rounded-full border border-navy/25 px-7 py-3 font-semibold text-navy transition-colors duration-300 hover:border-gold hover:text-gold-dark">Explore the Museum Project</Link>
              <Link href="/donate" className="link-sweep min-h-12 content-center font-semibold text-gold-dark">Donate Now</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
