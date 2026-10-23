import type { Metadata } from "next";
import { Suspense } from "react";
import DonateForm from "@/components/DonateForm";
import { CategoriesTable, FundraisingSummary, RecentDonations } from "@/components/Fundraising";
import { Rubric } from "@/components/Editorial";
import Reveal from "@/components/Reveal";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Donate", description: "Donate to the Dr. Rodas Foundation Museum Project — transparent targets, confirmed-only totals, and secure checkout once payment providers are activated.", openGraph: { title: "Donate · Dr. Rodas Foundation", images: ["/logo.png"] } };

export default function Donate(props: { searchParams?: Promise<{ campaign?: string }> }) {
  return <Suspense fallback={<p className="mx-auto max-w-3xl px-4 py-14 text-navy/55">Loading donation form…</p>}><DonateInner {...props} /></Suspense>;
}

async function DonateInner({ searchParams }: { searchParams?: Promise<{ campaign?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 lg:pt-20">
      <Reveal>
        <Rubric>Donate</Rubric>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] font-medium text-navy sm:text-5xl lg:text-6xl">Make a gift to the museum</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-navy/65">Choose a campaign or funding category, an amount, and how you would like to give. You will always see the currency and the status of your donation before anything is recorded. A donation is never marked completed before server-side payment verification.</p>
        <div className="rule-gold mt-10" aria-hidden />
      </Reveal>

      <div className="mt-10">
        <FundraisingSummary />
      </div>

      <section aria-label="Donation targets and progress" className="mt-14">
        <Reveal>
          <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Donation targets &amp; progress</h2>
          <p className="mt-2 max-w-3xl leading-7 text-navy/65">Categories are configurable by foundation administrators. The figures below are the proposed seed configuration (raised = 0, confirmed donations only) until the foundation approves live categories.</p>
        </Reveal>
        <div className="mt-6"><CategoriesTable /></div>
      </section>

      <div className="mx-auto mt-16 max-w-3xl">
        <DonateForm initialSlug={sp?.campaign} />
        <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-navy/60">
          <ShieldCheck className="mt-1 shrink-0 text-gold-dark" size={16} aria-hidden />
          Your donation is recorded with a unique reference and a receipt is issued when payment is confirmed by the payment provider. Card payments are processed by PCI-DSS compliant providers — the museum never sees or stores your card number. All payment methods remain disabled until a merchant account is verified.
        </p>
      </div>

      <div className="mt-16">
        <RecentDonations />
      </div>
    </div>
  );
}
