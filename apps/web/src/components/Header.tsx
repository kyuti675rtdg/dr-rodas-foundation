"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// Primary navigation — exactly as specified in the master prompt. Secondary
// links (Campaigns, Transparency, Donor Login, Admin) live in the footer only.
const NAV = [["Home", "/"], ["About", "/about"], ["Publications", "/publications"], ["News", "/news"], ["Museum Project", "/museum-project"], ["Contact", "/contact"]];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="Dr. Rodas Foundation — home">
          <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={44} height={44} priority className="h-11 w-11 rounded-full bg-white object-contain ring-1 ring-gold/50" />
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-navy">Dr. Rodas Foundation</span>
            <span className="block text-[11px] tracking-[0.18em] text-gold-dark uppercase">ዶክተር ሮዳስ ፋውንዴሽን</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-navy/75 xl:flex" aria-label="Primary">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} className="link-sweep min-h-11 content-center hover:text-navy">{label}</Link>
          ))}
          <Link href="/donate" className="inline-flex min-h-11 items-center rounded-full bg-gold px-5 py-2.5 font-semibold text-white transition-colors duration-300 hover:bg-gold-dark">Donate Now</Link>
        </nav>
        <div className="flex items-center gap-2 xl:hidden">
          <Link href="/donate" className="inline-flex min-h-11 items-center rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gold-dark">Donate Now</Link>
          <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="flex h-11 w-11 items-center justify-center text-navy transition-colors hover:text-gold-dark">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-paper px-4 py-3 xl:hidden" aria-label="Mobile">
          <div className="mb-1 flex items-center gap-3 px-2 py-2">
            <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={36} height={36} className="h-9 w-9 rounded-full bg-white object-contain ring-1 ring-gold/50" />
            <span className="font-serif font-semibold text-navy">Dr. Rodas Foundation</span>
          </div>
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="block min-h-11 content-center px-2 font-medium text-navy transition-colors hover:text-gold-dark">{label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
