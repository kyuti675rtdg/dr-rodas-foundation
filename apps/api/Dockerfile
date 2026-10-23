FROM php:8.3-cli
RUN apt-get update && apt-get install -y --no-install-recommends git unzip libzip-dev libicu-dev libsqlite3-dev libpq-dev \
  && docker-php-ext-install pdo pdo_sqlite pdo_mysql pdo_pgsql zip bcmath intl \
  && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY . .
RUN composer install --no-dev --optimize-autoloader --no-interaction \
  && mkdir -p database storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
  && touch database/database.sqlite && chmod -R 775 storage bootstrap/cache database
EXPOSE 8000
CMD ["bash", "start.sh"]
