
import type { Metadata } from "next";
import { CAMPAIGNS, PAYMENT_METHODS, money } from "@/lib/data";
export const metadata: Metadata = { title: "Administration" };
const MODULES = ["Campaign management","Donations & transactions","Donors & users","Programs & beneficiaries","Fund allocation & disbursements","Payment gateway configuration","Financial reports & reconciliation","Content & media","Notifications & announcements","Audit logs & security","System configuration & access control"];
export default function Admin() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Administration · Role-based access</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-stone-900">Foundation Dashboard</h1>
      <p className="mt-3 max-w-3xl text-stone-600">Access is least-privilege by role: Super Administrator, Foundation Administrator, Finance Officer, Campaign Manager, Authorized Reviewer and Read-only Auditor. Financial approvals, refunds and disbursements are restricted and fully audit-logged. This preview shows the module surface; live data loads from the admin API after sign-in.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[["Active campaigns", String(CAMPAIGNS.length)],["Combined goal", money(CAMPAIGNS.reduce((s,c)=>s+c.target,0))],["Confirmed donations","0"],["Pending confirmations","0"],["Refunds / failed","0"],["Gateway status","All disabled"]].map(([t,v]) => (
          <div key={t} className="rounded-3xl border border-stone-200 bg-white p-5"><p className="text-sm text-stone-500">{t}</p><p className="mt-1 font-serif text-2xl font-semibold text-stone-900">{v}</p></div>))}
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section><h2 className="font-serif text-2xl font-semibold text-stone-900">Campaigns</h2>
          <div className="mt-4 overflow-hidden rounded-3xl border border-stone-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-stone-50 text-stone-500"><tr><th className="px-5 py-3">Campaign</th><th className="px-5 py-3">Goal</th><th className="px-5 py-3">Status</th></tr></thead>
          <tbody>{CAMPAIGNS.map((c) => <tr key={c.slug} className="border-t border-stone-100"><td className="px-5 py-3.5 font-medium text-stone-900">{c.title}</td><td className="px-5 py-3.5">{money(c.target, c.currency)}</td><td className="px-5 py-3.5"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Published (seed)</span></td></tr>)}</tbody></table></div></section>
        <section><h2 className="font-serif text-2xl font-semibold text-stone-900">Payment gateways</h2>
          <div className="mt-4 overflow-hidden rounded-3xl border border-stone-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-stone-50 text-stone-500"><tr><th className="px-5 py-3">Method</th><th className="px-5 py-3">Group</th><th className="px-5 py-3">Status</th></tr></thead>
          <tbody>{PAYMENT_METHODS.map((m) => <tr key={m.id} className="border-t border-stone-100"><td className="px-5 py-3.5 font-medium text-stone-900">{m.label}</td><td className="px-5 py-3.5">{m.group}</td><td className="px-5 py-3.5"><span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-500">Disabled — pending verification</span></td></tr>)}</tbody></table></div>
          <p className="mt-3 text-xs leading-5 text-stone-500">A gateway can be enabled only after merchant approval, sandbox testing and webhook verification (docs/PAYMENT-SETUP-CHECKLIST.md).</p></section>
      </div>
      <h2 className="mt-10 font-serif text-2xl font-semibold text-stone-900">Administration modules</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{MODULES.map((m, i) => <div key={m} className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm font-medium text-stone-800"><span className="mr-2 font-serif text-amber-700">{String(i+1).padStart(2,"0")}</span>{m}</div>)}</div>
    </div>
  );
}
