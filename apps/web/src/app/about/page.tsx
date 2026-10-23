import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Cpu, GraduationCap, Landmark, Library, ScrollText } from "lucide-react";

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
  [ScrollText, "Research and Documentation", "Support the study, documentation, and preservation of historical records, manuscripts, and cultural knowledge."],
  [GraduationCap, "Education and Knowledge Sharing", "Develop educational materials, public programs, and learning opportunities for students, researchers, and communities."],
  [BookOpen, "Publications and Digital Resources", "Share approved research, books, articles, reports, and educational materials."],
  [Landmark, "Cultural Heritage Preservation", "Promote awareness of Ethiopia’s historical achievements, languages, traditions, and intellectual contributions."],
  [Library, "Museum Development", "Advance the Dr. Rodas Museum Project as a major initiative dedicated to heritage preservation, research, exhibitions, and public education."],
  [Cpu, "Digital Innovation", "Explore responsible uses of digital technology to preserve knowledge and expand access to cultural and educational resources."],
] as const;

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">About Us</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">Dr. Rodas Foundation</h1>
        <p className="mt-3 font-serif text-xl text-gold-dark">Preserving Heritage. Advancing Knowledge. Inspiring Generations.</p>
        <div className="mt-6 space-y-5 leading-7 text-neutral-700">
          <h2 className="font-serif text-2xl font-semibold text-navy">About the Foundation</h2>
          <p>Dr. Rodas Foundation is dedicated to preserving, documenting, researching, and sharing Ethiopian intellectual, historical, and cultural heritage. Through education, research, publications, cultural initiatives, and digital innovation, the foundation seeks to make Ethiopia’s rich knowledge traditions accessible to present and future generations.</p>
          <p>The foundation promotes the study of Ethiopian history, languages, manuscripts, philosophy, astronomy, and traditional systems of knowledge while encouraging research, public engagement, and international collaboration.</p>

          <h2 className="font-serif text-2xl font-semibold text-navy">Our Mission</h2>
          <p>To preserve and advance Ethiopian intellectual and cultural heritage through research, education, documentation, publications, and innovative technologies.</p>

          <h2 className="font-serif text-2xl font-semibold text-navy">Our Vision</h2>
          <p>To become a respected institution connecting Ethiopia’s rich heritage with global scholarship, contemporary learning, and future generations.</p>

          <h2 className="font-serif text-2xl font-semibold text-navy">Our Core Objectives</h2>
          <ul className="list-disc space-y-2 pl-6">
            {OBJECTIVES.map((o) => <li key={o}>{o}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">What We Do</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">Our Programs and Initiatives</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map(([Icon, t, d]) => { const I = Icon as typeof Landmark; return (
              <div key={t} className="rounded-3xl border border-mist bg-ivory/60 p-5"><I className="text-gold" /><h3 className="mt-3 font-serif text-lg font-semibold text-navy">{t}</h3><p className="mt-1 text-sm leading-6 text-neutral-600">{d}</p></div>); })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="space-y-5 leading-7 text-neutral-700">
          <h2 className="font-serif text-2xl font-semibold text-navy">Our Commitment</h2>
          <p>We believe that preserving heritage is an investment in the future. By connecting historical knowledge with education, research, and technology, Dr. Rodas Foundation aims to help future generations understand, appreciate, and build upon Ethiopia’s intellectual and cultural legacy.</p>

          <h2 className="font-serif text-2xl font-semibold text-navy">Registration &amp; contact</h2>
          <p>Official registration details will be published on this page once verified by the foundation.</p>
          <p>Website: <a className="font-semibold text-gold" href="https://drrodas.org">https://drrodas.org</a> · Email: <a className="font-semibold text-gold" href="mailto:support@drrodas.org">support@drrodas.org</a></p>
        </div>

        <div className="mt-10 rounded-3xl bg-navy p-8 text-center text-white sm:p-10">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Support Our Mission</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-neutral-300">Your contribution can help advance research, preserve valuable knowledge, support educational initiatives, and develop the Dr. Rodas Museum Project.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/donate" className="rounded-full bg-white px-6 py-3 font-semibold text-navy hover:bg-ivory">Support the Foundation</Link>
            <Link href="/museum-project" className="rounded-full border border-white/40 px-6 py-3 font-semibold hover:border-gold-light hover:text-gold-light">Explore the Museum Project</Link>
            <Link href="/donate" className="rounded-full bg-gold px-6 py-3 font-semibold text-white hover:bg-gold-dark">Donate Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
