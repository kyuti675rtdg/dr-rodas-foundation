import type { Metadata } from "next";
import { Globe, Mail } from "lucide-react";
import { PageOpening } from "@/components/Editorial";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact", description: "Contact the Dr. Rodas Foundation: support@drrodas.org · drrodas.org" };

export default function Contact() {
  return (
    <div>
      <PageOpening rubric="Contact" title="Talk to the foundation" lede="For donation support, receipts, partnership and press enquiries, contact the foundation at the verified channels below. Donation receipts and transaction support are also available to donors through the donor dashboard once accounts are enabled." />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="grid max-w-4xl gap-x-14 sm:grid-cols-2">
            <a href="mailto:support@drrodas.org" className="group border-t border-line py-7">
              <Mail className="text-gold-dark" aria-hidden />
              <h2 className="mt-4 font-serif text-2xl font-medium text-navy">Email</h2>
              <p className="link-sweep mt-1.5 inline-block font-semibold text-gold-dark">support@drrodas.org</p>
              <p className="mt-2 leading-7 text-navy/65">Donation help, receipts, partnerships and press.</p>
            </a>
            <a href="https://drrodas.org" className="group border-t border-line py-7">
              <Globe className="text-gold-dark" aria-hidden />
              <h2 className="mt-4 font-serif text-2xl font-medium text-navy">Website</h2>
              <p className="link-sweep mt-1.5 inline-block font-semibold text-gold-dark">drrodas.org</p>
              <p className="mt-2 leading-7 text-navy/65">Official website of the Dr. Rodas Foundation.</p>
            </a>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-10 max-w-4xl border-t border-line pt-8 text-[0.95rem] leading-7 text-navy/70">
            <p><strong className="text-navy">Donation help:</strong> write to <a href="mailto:support@drrodas.org" className="link-sweep font-semibold text-gold-dark">support@drrodas.org</a> and keep your donation reference (format DRF-YYYY-XXXXXXXX) — support can trace any payment from it without asking for card details. Never share full card numbers by email.</p>
            <p className="mt-4">Phone number and visiting address will be published here once verified by the foundation.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
