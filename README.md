<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h2 align="center">Documentation</h2>
  <h3 align="center">Gorry Well</h3>

  <h4 align="center">
    Technical Test / Take Home Test
  </h4>
</div>

## About The Project

## Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

#### Prerequisites

You need to install these tools before you can run this project :

-   [Node Js](https://nodejs.org/en)
-   [Mongo DB](https://www.mongodb.com/)
-   [Git](https://git-scm.com/)

### Installation

```bash
git https://github.com/mohamilin/gorry-well
cd gorry-well
```

Database : <br>
Create database with MongoDB
<br><br>
Install dependencies:

```bash
npm install
```

Set environment variables:

```bash
cp .env.example .env
```

Open .env next setup the environment:
<br>
example:

```bash
MONGODB_URL=mongodb://127.0.0.1:27017/db_name

JWT_SECRET=ddsdjWWsfln3290V042394gnlgnsdl9324
JWT_ACCESS_EXPIRATION_MINUTES=300
JWT_REFRESH_EXPIRATION_DAYS=2
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=30
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=30

TOKEN_TYPE_REFRESH=refresh
TOKEN_TYPE_ACCESS=access
TOKEN_TYPE_RESET_PASSWORD=resetPassword
TOKEN_TYPE_VERIFY_EMAIL=verifyEmail
```

## Usage

after install dependencies with `npm install`

Install husky:

```bash
npm run prepare
```

Running localy:

```bash
npm run dev
```

Running DB seed:

```bash
npm run dev:seed
```

Testing:

```bash
# run all tests and coverage
npm run test
```

Linting:

```bash
# run ESLint
 npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier:check

# fix prettier
npm prettier:fix

# format code
npm run format
```

Before Commit:

```bash
# running for prettier and test
npm run pre-commit
```

Docker Support for DEV:

```bash
# run docker dev
 npm run docker:dev
```

### API Documentation

The requirment for running this documentation, you must `running db seed`.

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/api/v1` in postman.
<br>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://universal-astronaut-206269.postman.co/workspace/My-Workspace~262b78b9-36cf-490e-84ce-9d01ef699d60/collection/7806854-2c7cc8d2-fdd5-434d-9226-ea39cdaaede1?action=share&creator=7806854)

or use dowload collection and environment :

-   [Downlad Collection](./public//postman/Api%20App.postman_collection.json)
-   [Downlad Environment](./public//postman/)

### Testing

This project completed with unit test (mocking data) and the coverage 100%.

![Coverage Unit Test](https://raw.githubusercontent.com/mohamilin/gorry-well/main/public/Coverage-API.png)
