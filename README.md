# Storefront Backend Project

###### _Udacity FWD Fullstack Project by Ahmed Rizk_

#### Attention! This software product has docker compose file for PostgreSQL

## Overview

This project is using Node as backend environment and Express to build a RESTful api application according to industry standards for **Storefront E-Commerce**.
**Nodejs** , **Visual Studio Code** and **Docker** needed as a prerequisites to test and run the project.

## How to setup the project

**1.** Clone the repository from [Repo](https://github.com/arizk76/udacity-storefront-backend) - or download the folder from [Here](https://github.com/arizk76/udacity-storefront-backend/archive/refs/heads/master.zip).

**2.** Install all project dependencies:

> npm install

**3.** Create .env file with the following environment variables _" Complete "_

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
ENV=dev
BCRYPT_PASSWORD=AnyPassword
SALT_ROUNDS=10
TOKEN_SECRET=AnySecret

**4.** Compiling typescript code into **dist** folder:

> npm run build

**5.** Install database _" Docker should be installed first "_ using the following command"

> docker-compose -f "docker-compose.yml" up -d --build

## Scripts

Run project in development mode

> npm run watch

Run project in production mode

> npm run start

Run Tests

> npm run test

Lint and prettier

> npm run lint
> npm run prettier

## Database Information

For development and Testing
HOST 127.0.0.1
PORT 5432
USER postgres
PASSWD postgres

### DEV

DB Name: store_dev

### TEST

DB Name: store_test
