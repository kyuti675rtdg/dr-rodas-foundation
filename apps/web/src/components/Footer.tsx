"use client";
import Image from "next/image";
import Link from "next/link"; import { useEffect, useState } from "react"; import { Globe, Mail, ShieldCheck } from "lucide-react";
export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="bg-navy text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 text-white">
            <Image src="/logo.png" alt="Dr. Rodas Foundation — official logo" width={52} height={52} className="h-[52px] w-[52px] rounded-full bg-white object-contain ring-1 ring-gold/50" />
            <span className="font-serif text-lg font-semibold leading-tight">Dr. Rodas<br />Foundation</span>
          </div>
          <p className="mt-3 text-sm leading-6">Preserving Ethiopian cultural heritage, Ge&rsquo;ez manuscripts and shared history — and opening learning to everyone, supported by donors around the world.</p>
          <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-neutral-400"><ShieldCheck size={14} className="mt-0.5 shrink-0 text-gold-light" /> Payments are processed only by PCI-DSS compliant providers. The foundation never stores card numbers.</p>
        </div>
        <div><h3 className="font-semibold text-white">Explore</h3><ul className="mt-3 space-y-2 text-sm">
          {[["Home","/"],["About","/about"],["Publications","/publications"],["News","/news"],["Museum Project","/museum-project"],["Donate Now","/donate"]].map(([l,h]) => <li key={h}><Link className="hover:text-gold-light" href={h}>{l}</Link></li>)}</ul></div>
        <div><h3 className="font-semibold text-white">More &amp; Accountability</h3><ul className="mt-3 space-y-2 text-sm">
          {[["Campaigns","/campaigns"],["Financial Transparency","/transparency"],["Privacy & Transparency","/transparency"],["Donor Login","/donor"],["Administration","/admin"]].map(([l,h]) => <li key={h}><Link className="hover:text-gold-light" href={h}>{l}</Link></li>)}
          <li className="text-neutral-400">Donation, refund &amp; privacy policies are published by the foundation before launch.</li></ul></div>
        <div><h3 className="font-semibold text-white">Contact</h3>
          <p className="mt-3 flex items-center gap-2 text-sm"><Mail size={15} className="text-gold-light" /><a href="mailto:support@drrodas.org" className="hover:text-gold-light">support@drrodas.org</a></p>
          <p className="mt-2 flex items-center gap-2 text-sm"><Globe size={15} className="text-gold-light" /><a href="https://drrodas.org" className="hover:text-gold-light">drrodas.org</a></p>
          <p className="mt-3 text-sm leading-6 text-neutral-400">Official registration details and visiting address will be published here once verified by the foundation.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-neutral-400">© {year} Dr. Rodas Foundation · drrodas.org · support@drrodas.org. All rights reserved.</div>
    </footer>
  );
}
