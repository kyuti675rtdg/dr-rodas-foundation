import type { Metadata } from "next";
import { Suspense } from "react";
import DonateForm from "@/components/DonateForm";
import { CategoriesTable, FundraisingSummary, RecentDonations } from "@/components/Fundraising";
import { ShieldCheck } from "lucide-react";
export const metadata: Metadata = { title: "Donate", description: "Donate to the Dr. Rodas Foundation Museum Project — transparent targets, confirmed-only totals, and secure checkout once payment providers are activated.", openGraph: { title: "Donate · Dr. Rodas Foundation", images: ["/logo.png"] } };
export default function Donate(props: { searchParams?: Promise<{ campaign?: string }> }) {
  return <Suspense fallback={<p className="mx-auto max-w-3xl px-4 py-14 text-neutral-500">Loading donation form…</p>}><DonateInner {...props} /></Suspense>;
}
async function DonateInner({ searchParams }: { searchParams?: Promise<{ campaign?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-14 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Donate</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">Make a gift to the museum</h1>
        <p className="mt-3 max-w-3xl leading-7 text-neutral-600">Choose a campaign or funding category, an amount, and how you would like to give. You will always see the currency and the status of your donation before anything is recorded. A donation is never marked completed before server-side payment verification.</p>
      </div>
      <FundraisingSummary />
      <section aria-label="Donation targets and progress">
        <h2 className="font-serif text-2xl font-semibold text-navy">Donation targets &amp; progress</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Categories are configurable by foundation administrators. The figures below are the proposed seed configuration (raised = 0, confirmed donations only) until the foundation approves live categories.</p>
        <div className="mt-5"><CategoriesTable /></div>
      </section>
      <div className="mx-auto max-w-3xl"><DonateForm initialSlug={sp?.campaign} /></div>
      <p className="mx-auto flex max-w-3xl items-start gap-2 text-sm leading-6 text-neutral-500"><ShieldCheck className="mt-1 shrink-0 text-emerald-700" size={16} />
        Your donation is recorded with a unique reference and a receipt is issued when payment is confirmed by the payment provider. Card payments are processed by PCI-DSS compliant providers — the museum never sees or stores your card number. All payment methods remain disabled until a merchant account is verified.</p>
      <RecentDonations />
    </div>
  );
}
