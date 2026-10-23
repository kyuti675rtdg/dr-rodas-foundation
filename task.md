# Dr. Rodas Foundation — Museum Fundraising Platform — task.md

> SCOPE CORRECTION (2026-10-23, by Tekalegn): This is a **MUSEUM** fundraising platform.
> It is NOT a Muslim/religious platform. All Zakat / Sadaqah / Islamic content from the
> first brief is REMOVED. Donation designations are museum purposes only.

## Status legend: [x] implemented + tested in this workspace · [ ] pending / blocked

## Phase 1 — Foundation
- [x] Monorepo scaffold: apps/web (Next.js 16, TypeScript, Tailwind v4), apps/api (Laravel, PHP 8.3)
- [x] Architecture, DB schema (MySQL design, SQLite for local tests), .env examples — no real secrets
- [x] Roles & RBAC design: super_admin, foundation_admin, finance_officer, campaign_manager, reviewer, auditor, donor
- [ ] Foundation to confirm: official registration details, logo, museum photography, address/contacts, bank/settlement details
- [ ] Foundation to confirm: first real campaigns, goals, currencies and approval owners

## Phase 2 — Campaigns & Donations
- [x] Public pages: home, about (mission/vision), campaigns + detail, updates, transparency, contact
- [x] Campaign CRUD API + admin UI surface, progress = confirmed donations only
- [x] Donation flow: one-time + recurring intent, preset/custom amounts, anonymous option, donor message privacy
- [x] Receipt record model + confirmation reference (PDF rendering: pending, see below)
- [ ] Receipt PDF generation (dompdf) — code path documented, not yet wired

## Phase 3 — Payments (ALL DISABLED UNTIL VERIFIED — by design)
- [x] Modular PaymentProvider contract + adapter registry + idempotency + signed-webhook handler + duplicate-event protection
- [ ] Visa / Mastercard — via an eligible processor (Stripe adapter written for sandbox; Stripe has no direct Ethiopia merchant onboarding — eligibility UNVERIFIED; alternatives: Flutterwave / DPO Pay / Pesapal / local acquirer)
- [ ] Apple Pay / Google Pay — ride on the card processor; need merchant + domain verification after processor approval
- [ ] WeChat Pay — via Stripe or a direct provider; needs provider approval for the foundation's entity/country
- [ ] Ethiopian methods — Telebirr / CBE Birr / ArifPay adapters scaffolded, disabled; need merchant agreements + credentials
- [ ] Sandbox end-to-end test per provider, then production credential verification — BLOCKED on merchant accounts (foundation action)

## Phase 4 — Administration & Transparency
- [x] Admin dashboard surface: KPIs, campaigns, donations, allocations/disbursements, approvals, audit logs, gateways
- [x] Finance API: summaries by campaign/currency/provider/period, allocation + disbursement approval workflow, immutable audit events
- [x] Public transparency page (published summaries only; donor identities never exposed)

## Phase 5 — Testing & Launch
- [x] Laravel feature tests: campaign progress, donation flow, webhook idempotency, RBAC (run: php artisan test)
- [x] Next.js production build verified locally
- [ ] Staging deployment + stakeholder acceptance — needs hosting choice (Render/Vercel + managed MySQL)
- [ ] Production: backups, monitoring, secret rotation, payment go-live checklist signed off

## Known issues / decisions
- Amounts are DECIMAL(15,2) in DB, never float. Multi-currency totals are never summed without an exchange-rate record.
- Seed/demo data is labelled DEVELOPMENT SEED everywhere and lives only in seeders / frontend fallback data. It is not production financial data.
- No payment method is shown as active unless its gateway row is enabled AND credentials are configured server-side.
