#!/bin/bash
set -e
# Staging preview boot: ephemeral SQLite, re-seeded on each deploy (preview data only).
touch database/database.sqlite
[ -f .env ] || cp .env.example .env
php artisan key:generate --force
php artisan migrate:fresh --seed --force
php artisan config:clear
exec php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
