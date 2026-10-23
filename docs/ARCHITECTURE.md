# Architecture — Dr. Rodas Foundation Museum Platform

## Purpose
Raise funds for museum programs: preservation & restoration, exhibitions, education,
collections & archives, community outreach, research and capital development.
No religious donation categories exist in this system.

## Components
- **apps/web (Next.js)** — public site, donate flow, donor dashboard, admin dashboard.
  Talks to the API through a typed client (`src/lib/api.ts`). Falls back to clearly
  labelled development-seed data only when the API is not configured (local preview).
- **apps/api (Laravel)** — versioned REST API under `/api/v1`. Controllers -> Services ->
  Models. Policies + `role` middleware enforce RBAC. Queues handle notification jobs.
- **MySQL** — normalized schema (`database/schema.mysql.sql`, mirrored by Laravel migrations).
  Financial amounts DECIMAL(15,2). Original currency always preserved; reporting
  conversions stored separately with the exchange rate used.

## Money rules (enforced in code)
1. Campaign progress counts donations with status `confirmed` only.
2. Pending / failed / cancelled / refunded donations never increase progress;
   refunds decrease it through a recorded Refund transaction, never an edit.
3. Webhooks are signature-verified, stored raw, and idempotent on
   (provider, provider_event_id). Duplicate deliveries are acknowledged, not re-processed.
4. Every donation initiation carries a unique reference + idempotency key.
5. Gross collected != available cash: settlements and disbursements are separate
   records with an approval workflow (finance_officer prepares, foundation_admin approves).
6. Material changes write immutable `audit_logs` rows.

## Roles
super_admin · foundation_admin · finance_officer · campaign_manager · reviewer ·
auditor (read-only) · donor

## Payments (modular)
`App\Services\Payments\Contracts\PaymentProvider` with adapters:
StripePaymentProvider (Visa, Mastercard, Apple Pay, Google Pay, WeChat Pay — sandbox),
TelebirrPaymentProvider, ArifPayPaymentProvider, CbeBirrPaymentProvider (Ethiopian, disabled).
A gateway is usable only when its DB row is enabled, its mode matches the environment,
and its secrets exist in server env. The public API returns only usable methods.
