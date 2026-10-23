
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">Talk to the foundation</h1>
      <p className="mt-4 leading-7 text-neutral-600">For donation support, receipts, partnership and press enquiries, the foundation will publish its verified email, phone and visiting address here before launch. Donation receipts and transaction support are available to donors through the donor dashboard once accounts are enabled.</p>
      <div className="mt-8 rounded-3xl border border-mist bg-white p-6 text-sm leading-6 text-neutral-600">
        <p><strong className="text-navy">Donation help:</strong> keep your donation reference (format DRF-YYYY-XXXXXXXX) — support can trace any payment from it without asking for card details. Never share full card numbers by email.</p>
      </div>
    </div>
  );
}
