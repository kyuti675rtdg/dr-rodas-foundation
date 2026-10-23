
import type { Metadata } from "next";
import { Suspense } from "react";
import DonateForm from "@/components/DonateForm";
import { ShieldCheck } from "lucide-react";
export const metadata: Metadata = { title: "Donate" };
export default function Donate(props: { searchParams?: Promise<{ campaign?: string }> }) {
  return <Suspense fallback={<p className="mx-auto max-w-3xl px-4 py-14 text-neutral-500">Loading donation form…</p>}><DonateInner {...props} /></Suspense>;
}
async function DonateInner({ searchParams }: { searchParams?: Promise<{ campaign?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Donate</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">Make a gift to the museum</h1>
      <p className="mt-3 leading-7 text-neutral-600">Choose a campaign, an amount, and how you would like to give. You will always see the currency and the status of your donation before anything is recorded.</p>
      <div className="mt-8"><DonateForm initialSlug={sp?.campaign} /></div>
      <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-neutral-500"><ShieldCheck className="mt-1 shrink-0 text-emerald-700" size={16} />
        Your donation is recorded with a unique reference and a receipt is issued when payment is confirmed by the payment provider. Card payments are processed by PCI-DSS compliant providers — the museum never sees or stores your card number.</p>
    </div>
  );
}
