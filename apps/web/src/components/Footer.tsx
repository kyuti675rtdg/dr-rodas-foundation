"use client";

import Link from "next/link"; import { useEffect, useState } from "react"; import { Landmark, ShieldCheck } from "lucide-react";
export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="bg-navy text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div><div className="flex items-center gap-2 text-white"><Landmark className="text-gold-light" /><span className="font-serif text-lg font-semibold">Dr. Rodas Foundation</span></div>
          <p className="mt-3 text-sm leading-6">Preserving cultural heritage, sharing history, and opening learning to everyone — supported by donors around the world.</p>
          <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-neutral-400"><ShieldCheck size={14} className="mt-0.5 shrink-0" /> Payments are processed only by PCI-DSS compliant providers. The foundation never stores card numbers.</p></div>
        <div><h3 className="font-semibold text-white">Explore</h3><ul className="mt-3 space-y-2 text-sm">
          {[["About the Museum","/about"],["Campaigns","/campaigns"],["Campaign Updates","/updates"],["Donate","/donate"]].map(([l,h]) => <li key={h}><Link className="hover:text-gold-light" href={h}>{l}</Link></li>)}</ul></div>
        <div><h3 className="font-semibold text-white">Accountability</h3><ul className="mt-3 space-y-2 text-sm">
          {[["Financial Transparency","/transparency"],["Donor Dashboard","/donor"],["Administration","/admin"]].map(([l,h]) => <li key={h}><Link className="hover:text-gold-light" href={h}>{l}</Link></li>)}
          <li className="text-neutral-400">Donation, refund &amp; privacy policies are published by the foundation before launch.</li></ul></div>
        <div><h3 className="font-semibold text-white">Contact</h3><p className="mt-3 text-sm leading-6">Foundation contact details, registration information and visiting address will be published here once verified by the foundation.</p></div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-neutral-500">© {year} Dr. Rodas Foundation. All rights reserved.</div>
    </footer>
  );
}
