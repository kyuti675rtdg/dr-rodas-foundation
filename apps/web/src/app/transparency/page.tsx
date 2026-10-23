import type { Metadata } from "next";
import { CAMPAIGNS, money, progress } from "@/lib/data";
import { ProgressBar } from "@/components/CampaignCard";
import { PageOpening, Rubric } from "@/components/Editorial";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Financial Transparency" };

const PRINCIPLES = [
  ["Gross confirmed donations", "Counted only when the payment provider confirms the transaction server-side."],
  ["Allocations & disbursements", "Prepared by a Finance Officer and approved by a Foundation Administrator before any disbursement."],
  ["Refunds & adjustments", "Refunds are recorded transactions that reverse campaign progress — records are never silently edited."],
] as const;

export default function Transparency() {
  return (
    <div>
      <PageOpening rubric="Financial Transparency" title="How funds are tracked and used" lede="The foundation distinguishes confirmed donations, payment fees, pending settlements, available balances and disbursed funds. Gross donations are never reported as available cash before settlement and reconciliation. Public summaries are published only after authorised review; donor identities are never published." />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div>
          {PRINCIPLES.map(([t, d]) => (
            <div key={t} className="grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
              <h2 className="font-serif text-xl font-medium text-navy sm:col-span-5">{t}</h2>
              <p className="leading-7 text-navy/65 sm:col-span-7">{d}</p>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="mt-16">
            <Rubric>Fund status</Rubric>
            <h2 className="mt-3 font-serif text-3xl font-medium text-navy">Campaign fund status</h2>
          </div>
        </Reveal>
        <div className="mt-6 overflow-x-auto border-y border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-navy/55">
                <th className="py-3 pr-5 font-semibold">Campaign</th>
                <th className="px-5 py-3 font-semibold">Goal</th>
                <th className="px-5 py-3 font-semibold">Confirmed</th>
                <th className="py-3 pl-5 font-semibold">Progress</th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c) => (
                <tr key={c.slug} className="border-t border-line">
                  <td className="py-4 pr-5 font-medium text-navy">{c.title}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{money(c.target, c.currency)}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{money(c.raised, c.currency)}</td>
                  <td className="py-4 pl-5"><div className="flex items-center gap-3"><div className="w-28"><ProgressBar value={progress(c)} /></div>{progress(c)}%</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-5 text-navy/55">Preview figures are development seed values (currently zero). In production this page is generated from the audited finance API and published reports with their reporting periods.</p>
      </div>
    </div>
  );
}
