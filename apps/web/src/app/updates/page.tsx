
import type { Metadata } from "next";
import { UPDATES } from "@/lib/data";
export const metadata: Metadata = { title: "Our Impact & Updates" };
export default function Updates() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Our Impact</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-stone-900">Campaign updates &amp; stories</h1>
      <p className="mt-3 leading-7 text-stone-600">Verified progress reports, conservation notes and stories from the programs your gifts make possible. Only foundation-approved, factual updates are published here.</p>
      <div className="mt-8 space-y-5">{UPDATES.map((u) => (
        <article key={u.id} className="rounded-3xl border border-stone-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">{u.campaign} · {u.date}</p>
          <h2 className="mt-2 font-serif text-xl font-semibold text-stone-900">{u.title}</h2>
          <p className="mt-2 leading-7 text-stone-600">{u.body}</p></article>))}
      </div>
    </div>
  );
}
