
"use client";
import Link from "next/link"; import { useState } from "react"; import { Landmark, Menu, X, Heart } from "lucide-react";
const NAV = [["Home","/"],["About","/about"],["Campaigns","/campaigns"],["Our Impact","/updates"],["Transparency","/transparency"],["Contact","/contact"]];
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-mist/80 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Dr. Rodas Foundation Museum — home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-gold-light"><Landmark size={20} /></span>
          <span className="leading-tight"><span className="block font-serif text-lg font-semibold text-navy">Dr. Rodas Foundation</span>
          <span className="block text-[11px] uppercase tracking-[0.22em] text-gold">Museum · Heritage · Learning</span></span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 lg:flex" aria-label="Primary">
          {NAV.map(([label, href]) => <Link key={href} href={href} className="hover:text-gold">{label}</Link>)}
          <Link href="/donor" className="hover:text-gold">Donor Login</Link>
          <Link href="/donate" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-white shadow-sm transition hover:bg-gold-dark"><Heart size={16} /> Donate Now</Link>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-mist bg-ivory px-4 py-3 lg:hidden" aria-label="Mobile">
        {[...NAV, ["Donor Login","/donor"], ["Donate Now","/donate"]].map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium text-navy hover:bg-mist">{label}</Link>))}
      </nav>}
    </header>
  );
}
