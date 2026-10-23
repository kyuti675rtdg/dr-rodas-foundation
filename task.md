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

## Phase 6 — Master Prompt Upgrade (2026-10-23)
- [x] Official logo integrated (user-supplied artwork, never redrawn): assets/dr-rodas-official-logo.png (1425×1445 original), apps/web/public/logo.png + public/brand/dr-rodas-logo.png, favicon src/app/icon.png (512px). Used in Header (desktop + mobile nav), Footer, Home hero, Museum Project hero, donation-facing pages and OpenGraph/Twitter metadata (metadataBase https://drrodas.org, OG image /logo.png).
- [x] Brand palette applied site-wide: navy #0B1239, gold #A77C2C (+ gold-dark/gold-light), white, warm ivory #FAF7F0, light gray (mist) — stone/amber palette fully replaced in globals.css, Header, Footer, Home and all pages/components. Serif headings (Fraunces) + Inter, with Noto Sans Ethiopic (ethiopic subset via next/font/google) added as the Amharic-capable fallback.
- [x] Primary navigation exactly: Home /, About /about, Publications /publications, News /news, Museum Project /museum-project, Contact /contact + prominent gold Donate Now /donate button (always visible, incl. mobile bar). Secondary links (Campaigns, Transparency, Donor Login, Admin) moved to footer only. Footer carries logo, support@drrodas.org, drrodas.org, nav and privacy/transparency links.
- [x] NEW /publications: searchable/filterable digital library (title/author/topic/category/date), featured section, cards + /publications/[slug] detail pages (generateStaticParams + SEO metadata). Data = PUBLICATIONS in src/lib/data.ts — 6 clearly-labelled DEVELOPMENT SEED placeholders (Ge'ez, manuscripts, Ethiopian history, Gematria, astronomy, philosophy/heritage); NO real books/authors fabricated; download shows "Download available after foundation approval" when no authorized file exists.
- [x] NEW /news: editorial layout, featured top story, search + category/date filters (7 prompt categories), cards + /news/[slug] article pages (related news, share links for X/Facebook/LinkedIn/WhatsApp, OG/Twitter metadata). NEWS in data.ts = 2 seed explainer articles only, labelled "Development seed — not a real foundation announcement". /updates now redirects to /news.
- [x] NEW /museum-project: purpose/vision/cultural significance, Ge'ez & manuscripts, Gematria, Ethiopian astronomy/calendars, research/education/exhibitions/archives/digital preservation pillars, 5 stages all honestly labelled Planned (none marked completed), fundraising summary + categories table (confirmed-only, raised = 0), prominent "Donate to the Museum" CTAs, related news.
- [x] Home upgraded: logo hero (incl. Amharic foundation name in Ethiopic type), Donate Now + Explore Museum Project buttons, mission/vision, featured Museum Project + progress, programs, featured publications, latest news, fundraising summary (target/raised/remaining/%), recent donations section with honest empty state ("No verified donations to display yet" — no donors invented), impact/transparency block + final Donate CTA.
- [x] Donate page upgraded: fundraising summary + responsive categories progress table (Museum infrastructure, Exhibition development, Manuscript preservation, Digital archives and technology, Research and education — proposed/seed, admin-configurable, raised = 0) + recent donations table (honest empty state). Existing DonateForm and payments-DISABLED honesty unchanged; donations never marked completed before server-side verification.
- [x] Contact page: support@drrodas.org + drrodas.org published explicitly. About page: support@drrodas.org + drrodas.org added, programs/heritage sections added, "do not invent history/registration/leadership" honesty preserved.
- [x] Laravel API: Publication + NewsArticle models, migration 2026_10_23_000005_create_content_tables, seeders (news seed explainer published-and-labelled; publication placeholder kept UNPUBLISHED draft), public routes GET /api/v1/publications, /publications/{slug}, /news, /news/{slug} (published-only) and admin CRUD under existing role middleware (foundation_admin/campaign_manager write; unpublish = archive, audit-logged). New tests/Feature/ContentApiTest.php (3 tests).
- [x] sitemap.ts + robots.ts updated (new routes; base https://drrodas.org). layout.tsx metadata: metadataBase, OG/Twitter with /logo.png.
- [x] VERIFIED 2026-10-23: `npm run build` PASS (Next 16.4.2, TypeScript clean, 32 pages) — routes: /, /about, /admin, /campaigns, /campaigns/[slug]×3, /contact, /donate, /donor, /museum-project, /news, /news/[slug]×2, /publications, /publications/[slug]×6, /robots.txt, /sitemap.xml, /transparency, /updates (redirect → /news), /icon.png.
- [x] VERIFIED 2026-10-23: `php artisan test` PASS — 10 tests / 44 assertions (was 7): ContentApiTest published-only filtering for publications + news, draft-by-slug 404 (incl. seed publication placeholder), admin content RBAC + unpublish flow; FoundationPlatformTest unchanged incl. zakat-designation rejection.
- [ ] BLOCKED — merchant accounts: no payment provider activated (Stripe has no direct Ethiopia onboarding; Flutterwave / DPO Pay / Pesapal / local acquirer + Telebirr/CBE/ArifPay agreements are foundation actions). Payments remain DISABLED by design.
- [ ] BLOCKED — real foundation content: verified registration/leadership details, real publications (titles/authors/files), real news, approved museum targets/categories, photography — all seed placeholders await foundation supply/approval.
- [ ] BLOCKED — deployment: staging/production hosting for drrodas.org not yet chosen/configured (DNS, managed MySQL, secrets). Site is build-verified locally only; drrodas.org is not live from this workspace.

## Phase 6 Addendum — Official Content Integrated (2026-10-23)
- [x] 2026-10-23 official foundation + museum content integrated (source: docs/OFFICIAL-CONTENT.md), superseding earlier placeholder About/Museum copy.
  - Source docs: docs/OFFICIAL-CONTENT.md saved verbatim (foundation + museum project texts, supplied by Tekalegn 2026-10-23).
  - About page rewritten using ONLY official foundation text: tagline "Preserving Heritage. Advancing Knowledge. Inspiring Generations.", official mission/vision, 7 Core Objectives, 6 Programs and Initiatives, Commitment, Support Our Mission (Support the Foundation / Explore the Museum Project / Donate Now), website https://drrodas.org / support@drrodas.org. Old invented Mission/Vision/Values removed.
  - Museum Project page updated to official museum text: tagline "Discovering Ethiopia's Intellectual Heritage. Preserving Knowledge for the Future.", official About (3 paragraphs), Vision, 6 Proposed Exhibition and Research Areas, Why This Project Matters, What Your Donation Can Support (7 items + transparency note), Development Approach with stages aligned to Planning/Research/Design/Fundraising/Infrastructure development/Exhibition preparation/Implementation (all Planned, none completed), Help Bring the Museum Project to Life.
  - Home page hero tagline and mission/vision aligned to official wording; old invented mission/vision sentences removed site-wide (grep verified: "free from barriers of income or geography" no longer appears in src).
