
"use client";
import { useMemo, useState } from "react"; import { CreditCard, Lock, RefreshCcw, Wallet } from "lucide-react";
import { CAMPAIGNS, DESIGNATIONS, PAYMENT_METHODS, money } from "@/lib/data";
import { initiateDonation } from "@/lib/api";
const PRESETS = [25, 50, 100, 250, 500, 1000];
export default function DonateForm({ initialSlug }: { initialSlug?: string }) {
  const [slug, setSlug] = useState(initialSlug ?? CAMPAIGNS[0].slug);
  const [amount, setAmount] = useState<number>(100);
  const [custom, setCustom] = useState("");
  const [type, setType] = useState<"one_time" | "recurring">("one_time");
  const [designation, setDesignation] = useState<string>("general");
  const [method, setMethod] = useState<string>("visa");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [anonymous, setAnonymous] = useState(false);
  const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string; ref?: string } | null>(null);
  const campaign = useMemo(() => CAMPAIGNS.find((c) => c.slug === slug) ?? CAMPAIGNS[0], [slug]);
  const finalAmount = custom ? Number(custom) || 0 : amount;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (finalAmount < 1) { setResult({ ok: false, text: "Please enter a donation amount of at least 1." }); return; }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) { setResult({ ok: false, text: "Please enter a valid email for your receipt, or leave it blank." }); return; }
    setBusy(true);
    try {
      const campaignId = CAMPAIGNS.indexOf(campaign) + 1; // seed ids match the Laravel seeder order
      const res = await initiateDonation({ campaign_id: campaignId, amount: finalAmount, currency: campaign.currency, designation, donation_type: type,
        payment_method: method === "visa" || method === "mastercard" ? "card" : method, donor_name: anonymous ? undefined : name || undefined,
        donor_email: email || undefined, is_anonymous: anonymous, message: msg || undefined, idempotency_key: crypto.randomUUID() });
      if ("state" in res && res.state === "preview_mode") setResult({ ok: true, text: res.message });
      else if ("reference" in res) setResult({ ok: true, ref: res.reference, text: res.payment?.message ?? `Donation recorded as ${res.status}. No charge is made until a verified payment gateway confirms it.` });
    } catch (err) { setResult({ ok: false, text: err instanceof Error ? err.message : "Something went wrong. Please try again." }); }
    finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="rounded-3xl border border-mist bg-white p-6 shadow-sm" aria-label="Donation form">
      <label className="text-sm font-semibold text-navy">Campaign</label>
      <select value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1.5 w-full rounded-xl border border-mist px-3 py-2.5" aria-label="Choose a campaign">
        {CAMPAIGNS.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
      </select>
      <div className="mt-5 grid grid-cols-2 gap-3" role="group" aria-label="Donation frequency">
        {(["one_time","recurring"] as const).map((t) => (
          <button type="button" key={t} onClick={() => setType(t)} aria-pressed={type === t}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold ${type === t ? "border-gold bg-ivory text-gold-dark" : "border-mist text-neutral-600"}`}>
            {t === "recurring" ? <RefreshCcw size={15} /> : <CreditCard size={15} />} {t === "one_time" ? "One-time" : "Monthly recurring"}</button>))}
      </div>
      <p className="mt-2 text-xs text-neutral-500">Recurring donations start only after a payment provider that supports subscriptions is verified and you confirm at checkout.</p>
      <label className="mt-5 block text-sm font-semibold text-navy">Amount ({campaign.currency})</label>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {PRESETS.map((p) => <button type="button" key={p} onClick={() => { setAmount(p); setCustom(""); }} aria-pressed={!custom && amount === p}
          className={`rounded-xl border px-3 py-2.5 font-semibold ${!custom && amount === p ? "border-gold bg-ivory text-gold-dark" : "border-mist text-neutral-700"}`}>{money(p, campaign.currency)}</button>)}
      </div>
      <input value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" placeholder="Or enter a custom amount"
        className="mt-2 w-full rounded-xl border border-mist px-3 py-2.5" aria-label="Custom amount" />
      <label className="mt-5 block text-sm font-semibold text-navy">Designation</label>
      <select value={designation} onChange={(e) => setDesignation(e.target.value)} className="mt-1.5 w-full rounded-xl border border-mist px-3 py-2.5 capitalize" aria-label="Donation designation">
        {DESIGNATIONS.map((d) => <option key={d} value={d}>{d.replace("_"," ")}</option>)}
      </select>
      <p className="mt-1 text-xs text-neutral-500">Restricted designations are preserved in the foundation's accounting and disbursement records.</p>
      <fieldset className="mt-5"><legend className="text-sm font-semibold text-navy">Payment method</legend>
        <div className="mt-2 space-y-2">
          {PAYMENT_METHODS.map((m) => (
            <label key={m.id} className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-sm ${method === m.id ? "border-gold bg-ivory" : "border-mist"}`}>
              <span className="inline-flex items-center gap-2 font-medium text-navy">{m.group === "Wallet" ? <Wallet size={15} /> : <CreditCard size={15} />} {m.label}
                <span className="text-xs font-normal text-neutral-400">· {m.group}</span></span>
              <span className="inline-flex items-center gap-2"><span className="rounded-full bg-mist px-2 py-0.5 text-[11px] font-semibold text-neutral-500">Not yet activated</span>
              <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} aria-label={m.label} /></span>
            </label>))}
        </div>
        <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-neutral-500"><Lock size={13} className="mt-0.5 shrink-0" />
          Payment methods activate one by one, only after the foundation's merchant account, sandbox tests and webhook verification pass for that provider. Until then, submitting records a pending donation intent — <strong>no card is charged</strong>.</p>
      </fieldset>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" className="rounded-xl border border-mist px-3 py-2.5" aria-label="Your name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for receipt (optional)" type="email" className="rounded-xl border border-mist px-3 py-2.5" aria-label="Email for receipt" />
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm text-neutral-700"><input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} /> Give anonymously (your name will not be shown publicly; the foundation still keeps the legally required transaction record)</label>
      <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message of support (optional)" rows={2} className="mt-3 w-full rounded-xl border border-mist px-3 py-2.5" aria-label="Message of support" />
      {result && <div role="status" className={`mt-4 rounded-xl px-4 py-3 text-sm ${result.ok ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>{result.text}{result.ref && <span className="mt-1 block font-semibold">Reference: {result.ref}</span>}</div>}
      <button disabled={busy} className="mt-5 w-full rounded-full bg-gold px-6 py-3.5 font-semibold text-white transition hover:bg-gold-dark disabled:opacity-60">
        {busy ? "Recording…" : `Donate ${money(finalAmount || 0, campaign.currency)}${type === "recurring" ? " / month" : ""}`}</button>
    </form>
  );
}
