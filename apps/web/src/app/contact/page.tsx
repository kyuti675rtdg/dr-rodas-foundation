import type { Metadata } from "next";
import { Globe, Mail } from "lucide-react";
export const metadata: Metadata = { title: "Contact", description: "Contact the Dr. Rodas Foundation: support@drrodas.org · drrodas.org" };
export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">Talk to the foundation</h1>
      <p className="mt-4 leading-7 text-neutral-600">For donation support, receipts, partnership and press enquiries, contact the foundation at the verified channels below. Donation receipts and transaction support are also available to donors through the donor dashboard once accounts are enabled.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a href="mailto:support@drrodas.org" className="rounded-3xl border border-mist bg-white p-6 transition hover:shadow-md">
          <Mail className="text-gold" /><h2 className="mt-3 font-serif text-lg font-semibold text-navy">Email</h2>
          <p className="mt-1 text-sm font-semibold text-gold">support@drrodas.org</p>
          <p className="mt-1 text-sm leading-6 text-neutral-600">Donation help, receipts, partnerships and press.</p></a>
        <a href="https://drrodas.org" className="rounded-3xl border border-mist bg-white p-6 transition hover:shadow-md">
          <Globe className="text-gold" /><h2 className="mt-3 font-serif text-lg font-semibold text-navy">Website</h2>
          <p className="mt-1 text-sm font-semibold text-gold">drrodas.org</p>
          <p className="mt-1 text-sm leading-6 text-neutral-600">Official website of the Dr. Rodas Foundation.</p></a>
      </div>
      <div className="mt-6 rounded-3xl border border-mist bg-white p-6 text-sm leading-6 text-neutral-600">
        <p><strong className="text-navy">Donation help:</strong> write to <a href="mailto:support@drrodas.org" className="font-semibold text-gold">support@drrodas.org</a> and keep your donation reference (format DRF-YYYY-XXXXXXXX) — support can trace any payment from it without asking for card details. Never share full card numbers by email.</p>
        <p className="mt-3">Phone number and visiting address will be published here once verified by the foundation.</p>
      </div>
    </div>
  );
}
