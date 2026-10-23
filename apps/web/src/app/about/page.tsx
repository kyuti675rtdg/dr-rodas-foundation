
import type { Metadata } from "next";
export const metadata: Metadata = { title: "About the Museum" };
export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">About Us</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-stone-900">The Dr. Rodas Foundation Museum</h1>
      <div className="prose mt-6 space-y-5 leading-7 text-stone-700">
        <p>The Dr. Rodas Foundation supports a museum dedicated to cultural heritage, history, education and preservation. Through exhibitions, archives, conservation work and community programs, the museum keeps shared memory alive and accessible.</p>
        <h2 className="font-serif text-2xl font-semibold text-stone-900">Mission</h2>
        <p>To collect, preserve and interpret cultural heritage — and to make history, art and learning accessible to everyone, free from barriers of income or geography.</p>
        <h2 className="font-serif text-2xl font-semibold text-stone-900">Vision</h2>
        <p>A living museum where every generation discovers where it comes from, cares for what remains, and creates what comes next.</p>
        <h2 className="font-serif text-2xl font-semibold text-stone-900">Values</h2>
        <ul className="list-disc space-y-2 pl-6"><li><strong>Stewardship</strong> — we hold collections in trust for future generations.</li>
        <li><strong>Access</strong> — heritage belongs to everyone, not only to specialists.</li>
        <li><strong>Scholarship</strong> — exhibits and programs are grounded in documented research.</li>
        <li><strong>Transparency</strong> — donors can follow their gifts from receipt to result.</li></ul>
        <h2 className="font-serif text-2xl font-semibold text-stone-900">Registration &amp; contact</h2>
        <p>Official registration details, the museum's address and foundation contacts will be published on this page once verified by the foundation. Nothing on this page should be treated as a legal registration claim until then.</p>
      </div>
    </div>
  );
}
