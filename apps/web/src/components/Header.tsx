"use client";
import Image from "next/image";
import Link from "next/link"; import { useState } from "react"; import { Menu, X, Heart } from "lucide-react";
// Primary navigation — exactly as specified in the master prompt. Secondary links
// (Campaigns, Transparency, Donor Login, Admin) live in the footer only.
const NAV = [["Home","/"],["About","/about"],["Publications","/publications"],["News","/news"],["Museum Project","/museum-project"],["Contact","/contact"]];
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-mist/80 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Dr. Rodas Foundation — home">
          <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={48} height={48} priority className="h-12 w-12 rounded-full bg-white object-contain ring-1 ring-gold/40" />
          <span className="leading-tight"><span className="block font-serif text-lg font-semibold text-navy">Dr. Rodas Foundation</span>
          <span className="block text-[11px] uppercase tracking-[0.22em] text-gold">Museum · Heritage · Learning</span></span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-neutral-700 xl:flex" aria-label="Primary">
          {NAV.map(([label, href]) => <Link key={href} href={href} className="hover:text-gold">{label}</Link>)}
          <Link href="/donate" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-gold-dark"><Heart size={16} /> Donate Now</Link>
        </nav>
        <div className="flex items-center gap-2 xl:hidden">
          <Link href="/donate" className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white hover:bg-gold-dark"><Heart size={15} /> Donate Now</Link>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} className="rounded-lg p-2 text-navy hover:bg-mist/60">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="border-t border-mist bg-ivory px-4 py-3 xl:hidden" aria-label="Mobile">
        <div className="mb-2 flex items-center gap-3 px-3 py-2">
          <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={36} height={36} className="h-9 w-9 rounded-full bg-white object-contain ring-1 ring-gold/40" />
          <span className="font-serif font-semibold text-navy">Dr. Rodas Foundation</span>
        </div>
        {[...NAV, ["Donate Now","/donate"]].map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium text-navy hover:bg-mist/60">{label}</Link>))}
      </nav>}
    </header>
  );
}
