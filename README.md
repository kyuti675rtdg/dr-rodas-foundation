# Dr. Rodas Foundation — Museum Fundraising Platform

Fundraising & donation platform for the Dr. Rodas Foundation museum: cultural heritage,
history, education and preservation.

## Stack
- `apps/web` — Next.js (TypeScript, App Router) + Tailwind CSS + Framer Motion + Lucide icons
- `apps/api` — Laravel REST API (PHP 8.3), Sanctum auth, queues for notifications
- Database — MySQL in production (see `database/schema.mysql.sql`); SQLite for local dev/tests

## Quick start (local)
```bash
# API
cd apps/api && cp .env.example .env && php artisan key:generate
php artisan migrate --seed && php artisan serve   # http://127.0.0.1:8000/api/v1

# Web
cd apps/web && cp .env.example .env.local && npm install && npm run dev  # http://localhost:3000
```

## Payments — read before enabling anything
No payment method is live by default. Each gateway must pass
`docs/PAYMENT-SETUP-CHECKLIST.md` (merchant account, eligibility, sandbox test,
webhook secret, settlement account) before its `is_enabled` flag may be turned on.

## Docs
- `docs/ARCHITECTURE.md` · `docs/DEPLOYMENT.md` · `docs/PAYMENT-SETUP-CHECKLIST.md` · `task.md`
