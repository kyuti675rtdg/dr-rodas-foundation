"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 text-white">
            <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={52} height={52} className="h-[52px] w-[52px] rounded-full bg-white object-contain ring-1 ring-gold/60" />
            <span className="font-serif text-lg leading-tight font-semibold">Dr. Rodas<br />Foundation</span>
          </div>
          <p className="mt-4 font-serif text-base text-gold-light italic">Preserving Heritage. Advancing Knowledge. Inspiring Generations.</p>
          <p className="mt-3 text-sm leading-6">Preserving Ethiopian intellectual, historical, and cultural heritage — and opening learning to everyone, supported by donors around the world.</p>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-white/50">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-gold-light" />
            Payments are processed only by PCI-DSS compliant providers. The foundation never stores card numbers.
          </p>
        </div>
        <nav aria-label="Explore">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">Explore</h3>
          <ul className="mt-4 space-y-1 text-sm">
            {[["Home", "/"], ["About", "/about"], ["Publications", "/publications"], ["News", "/news"], ["Museum Project", "/museum-project"], ["Donate Now", "/donate"]].map(([l, h]) => (
              <li key={h}><Link className="link-sweep inline-block min-h-8 content-center hover:text-gold-light" href={h}>{l}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Accountability">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">Accountability</h3>
          <ul className="mt-4 space-y-1 text-sm">
            {[["Campaigns", "/campaigns"], ["Financial Transparency", "/transparency"], ["Donor Login", "/donor"], ["Administration", "/admin"], ["Contact", "/contact"]].map(([l, h]) => (
              <li key={h}><Link className="link-sweep inline-block min-h-8 content-center hover:text-gold-light" href={h}>{l}</Link></li>
            ))}
            <li className="pt-2 text-white/50">Donation, refund &amp; privacy policies are published by the foundation before launch.</li>
          </ul>
        </nav>
        <div>
          <h3 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">Contact</h3>
          <p className="mt-4 flex items-center gap-2 text-sm">
            <Mail size={15} className="shrink-0 text-gold-light" />
            <a href="mailto:support@drrodas.org" className="link-sweep hover:text-gold-light">support@drrodas.org</a>
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Globe size={15} className="shrink-0 text-gold-light" />
            <a href="https://drrodas.org" className="link-sweep hover:text-gold-light">drrodas.org</a>
          </p>
          <p className="mt-4 text-sm leading-6 text-white/50">Official registration details and visiting address will be published here once verified by the foundation.</p>
          <p className="mt-4 text-xs leading-5 text-white/40">Photograph: Bete Giyorgis, Lalibela, by Bernard Gagnon, CC BY-SA 3.0, via Wikimedia Commons. Manuscript images: public domain, via Wikimedia Commons.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/45">© {year} Dr. Rodas Foundation · drrodas.org · support@drrodas.org. All rights reserved.</div>
    </footer>
  );
}
