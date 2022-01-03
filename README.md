# Storefront Backend Project

###### _Udacity FWD Fullstack Project by Ahmed Rizk_

#### Attention! This software product has docker compose file for PostgreSQL.

## Overview

This project is using Node as backend environment and Express to build a RESTful api application according to industry standards for **Storefront E-Commerce**.
**Nodejs** , **Visual Studio Code** and **Docker** needed as a prerequisites to test and run the project.

## How to setup the project.

**1.** Clone the repository from [Repo](https://github.com/arizk76/udacity-storefront-backend) - or download the folder from [Here](https://github.com/arizk76/udacity-storefront-backend/archive/refs/heads/master.zip).

**2.** Install all project dependencies:

> yarn install

**2.** Compiling typescript code into **dist** folder:

> yarn build

**3.** Install production database _" Docker should be installed first "_ using the following command"

> docker-compose -f "docker-compose.yml" up -d --build
