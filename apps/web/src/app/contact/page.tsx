
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Contact</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-stone-900">Talk to the foundation</h1>
      <p className="mt-4 leading-7 text-stone-600">For donation support, receipts, partnership and press enquiries, the foundation will publish its verified email, phone and visiting address here before launch. Donation receipts and transaction support are available to donors through the donor dashboard once accounts are enabled.</p>
      <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 text-sm leading-6 text-stone-600">
        <p><strong className="text-stone-900">Donation help:</strong> keep your donation reference (format DRF-YYYY-XXXXXXXX) — support can trace any payment from it without asking for card details. Never share full card numbers by email.</p>
      </div>
    </div>
  );
}
