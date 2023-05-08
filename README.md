# SunOverflow

SunOverflow is an internal project for the employees of Sun Asterisk PH that aims to help the team with asking and answering questions.

## Technologies used:

- Laravel
- MySQL
- GraphQL
- Next.js
- TypeScript
- Tailwind CSS

## Prerequisites:

- [Docker-Desktop](https://www.docker.com/products/docker-desktop/)
- [Nodejs](https://nodejs.org/en/download/)
- [Composer](https://getcomposer.org/download/)

## Manual setup:

1. `git clone git@github.com:framgia/sph-sun-overflow.git`
2. `cd sph-sun-overflow`
3. `cd backend`
4. `cp .env.example .env`
5. `php artisan serve`
6. Open another terminal then `cd sph-sun-overflow/frontend`
7. `npm install`
8. `npm run dev`

## Docker setup:

1. `git clone git@github.com:framgia/sph-sun-overflow.git`
2. `cd sph-sun-overflow`
3. `cd backend`
4. `cp .env.example .env`
5. `composer install`
6. `cd ../frontend`
7. `npm install`
8. `cd ..`
9. `docker-compose up --build`

## Pre commit setup:

1. If you don't have python-pip just run this on your ubuntu/wsl `sudo apt install python3-pip` after follow the instructions 2 and 3
2. [Required In system](https://github.com/johnpaul-sun/setup-php-cs-fixer#required-in-system)
3. [Install php-cs-fixer via composer](https://github.com/johnpaul-sun/setup-php-cs-fixer#1-install-php-cs-fixer-via-composer)
4. `pre-commit install`
5. You are good to go, whenever you commit changes it will have a linter checks to run and show you error / success messages.

## Documents

- [Estimation](https://docs.google.com/spreadsheets/d/1pSajhWswE2wfniCL-XcLGX5kjEV6o7oSQIVOgSbwtgQ/edit?usp=drive_web&ouid=103072047113463356263)
- [ERD](https://app.diagrams.net/#G1YMg16J4mSrkXzbFUVQsKdqbCAvtYo0g9)
- [Backlog](https://framgiaph.backlog.com/find/SUN_OVERFLOW?projectId=126452&statusId=1&statusId=2&statusId=3&parentChildIssue=4&sort=UPDATED&order=false&simpleSearch=true&allOver=false&offset=0)
- [UI/UX](https://www.figma.com/file/ySgsFhCJ8pZYQeUWDDBqdQ/SO?node-id=0%3A1)
