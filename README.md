# Home Library Service

Demo REST API online library for storing music tracks, artists and their albums with the ability to add to favorites. Under the hood uses NestJS and PostgreSQL DB with Prisma ORM.


## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

## Downloading and installing
Clone the repository:
```
git clone https://github.com/vzletit/nodejs2022Q4-service.git
```
Change directory:

```bash
cd nodejs2022Q4-service 
```
Switch to **log/err/auth** branch:

```bash
git checkout log/err/auth
```

Install NPM modules 

```
npm install
```

Rename *.env.example* to *.env*
```
mv .env.example .env
```

## Building images with Docker

Build app image:
```
npm run build:app
```
Build db image:
```
npm run build:db 
```
## Running application with Docker Compose

```
npm run start:docker
```

## API

### User registration
```
/auth/signup
```
POST body:
```
{ 
    "login": "LOGIN", 
    "password": "PASSWORD", 
}
```
### User authentication
```
/auth/login
```
POST body:
```
{ 
    "login": "LOGIN", 
    "password": "PASSWORD", 
}
```
### Obtaining new access and refresh tokens
```
/auth/refresh
```
POST body:
```
{ 
    "refreshToken": "REFRESH_TOKEN"    
}
```

### Service endpoints

Rest OpenAPI description can be found in */doc/newApi.yaml* file.

## Vulnerabilities scanning

Scan App image:

```
npm run scan:app
```

Scan Postgres image:

```
npm run scan:postgres
```
## Testing

When application is running, open new terminal and enter:

```
npm run test:auth
```

### Linting

```
npm run lint
```
