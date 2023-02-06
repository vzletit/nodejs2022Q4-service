# Home Library Service

Demo REST API online library for storing music tracks, artists and their albums with the ability to add to favorites. Under the hood uses NestJS and in-memory database.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading and installing
Clone the repository:
```
git clone https://github.com/vzletit/nodejs2022Q4-service.git
```
Change directory:

```bash
cd nodejs2022Q4-service 
```
Switch to **dev** branch:

```bash
git checkout dev
```

Install NPM modules with **--force** argument (due to @nestjs/swagger/plugin). There will be some vulnerabilities reported, even critical. Disregard them. We are brave guys. :-)

```
npm install --force
```

Rename *.env.example* to *.env*


## Running application

```
npm start
```

After starting the app on port (4000 as default. Can be changed in *.env*) you can open in your browser OpenAPI Swagger http://localhost:4000.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```


### Auto-fix and format

```
npm run lint
```

```
npm run format
```
