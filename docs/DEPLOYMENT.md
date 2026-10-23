# Deployment Guide (summary)

## Environments
development (local, SQLite, sandbox gateways) · staging (MySQL, sandbox gateways) · production (MySQL, verified gateways only)

## Production checklist
- [ ] HTTPS everywhere; secure headers; CORS restricted to the web origin
- [ ] APP_ENV=production, APP_DEBUG=false; all secrets in env/secret manager, rotated after setup
- [ ] MySQL: dedicated user (least privilege), automated daily backups + one tested restore
- [ ] Queue worker + scheduler running (notifications, recurring donations, reconciliation)
- [ ] Logging + uptime monitoring + failed-webhook / reconciliation alerts to admins
- [ ] Web: `npm run build` behind CDN; API: `php artisan config:cache route:cache`, migrations via release step
- [ ] Suggested hosting: web on Vercel or Render; API on Render/VPS (PHP 8.3 + MySQL) — final choice is the foundation's
- [ ] Go-live gate: PAYMENT-SETUP-CHECKLIST signed; content (registration, campaigns, photos) verified by the foundation; seed data removed
