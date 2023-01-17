FROM php:8.1

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apt-get update -y
RUN apt-get install -y git curl zip unzip libpng-dev libonig-dev libxml2-dev
RUN docker-php-ext-install pdo pdo_mysql bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app/backend

COPY .env.example .env
COPY . .

RUN composer install
RUN composer dump-autoload
RUN php artisan key:generate
RUN chmod 777 -R storage

EXPOSE 8000
CMD php artisan serve --port=8000 --host=0.0.0.0
