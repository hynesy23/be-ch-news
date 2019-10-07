# Northcoders News API

## Background

This is a RESTful API project for the backend of a mock news site that I have created, called NC News. It allows users create their own usernames, view topics, articles about these topics, as well as comments on each article, and also upvote or downvote the articles should they wish.

## Step 1 - Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

# Prerequisites

In order to begin, you will need to make sure you have node.js installed (postgres, npm i, git) globally on you IDE:

```bash
node -v
```

> If you do not have Node.js installed or command above does not work please follow the instructions on [this guide](https://nodejs.org/en/download/package-manager/).

You'll also need to make sure you have PostgreSQL:

```bash
psql --version
```

> If you do not have git installed on your machine please follow [this guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

And finally, you'll need to check if `git` is installed on your machine. To do this, enter the following command on your terminal:

```bash
git --version
```

> If you do not have git installed on your machine please follow [this guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Step 2 - Setting up Your Project

# Installing

After following the above steps, you will now be ready to install and run this application

First, you will need to clone this repo. Do this by selecting your preferred directory on your local machne from the command line, and enter the follwing command:

```bash
git clone https://github.com/steferguson/be-nc-news
```

Navigate inside the folder and install all dependencies by entering the following commands on your terminal window:

```bash
cd be-nc-news

npm install
```

Next you will need to create and populate the database, run below command to create the databases in PostgreSQL:

```bash
npm run setup-dbs
```

# Checking your Environment

Before you can populate the database you will need to create a `.env` file in the root directory of the project and set environment-specific variables.

Confirm you are in correct directory by either checking the path or checking other files within the directory. Other files that should appear are `app.js`, `listen.js`, etc:

```bash
# check path
pwd

# or use below to list files
ls
```

Now that you have confirmed you are in the correct directory create `.env`:

```bash
touch .env
```

After `.env` has been created and configured you can now populate the database using below command:

```
npm run seed
```

Finally to run the server enter the following command in your terminal window:

```
npm start
```

This will run the server on port 9090. All endpoints can be found locally on http://localhost:9090.

## Step 3 - Running your Tests

To test the API navigate to the project directory and enter the following command:

```
npm test
```

There are tests to check every available endpoint, such as whether an article ID exists, or if the body you've included in a post request includes the required keys.

Tests were built using the following: `Mocha`, `Chai` and `Supertest`.

## Step 4 - API Routes

In order to view all the endpoints available with this API, you can read `endpoints.json` or access `/api` either on the [live service](https://sf-be-news.herokuapp.com/api) or [localhost](http://localhost:9090/api) when you have the server running.

## Built With

- Runtime environment: [Node.js](https://nodejs.org/en/)
- Web framework: [Express](https://expressjs.com/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- SQL Query Builder: [Knex.js](http://knexjs.org/)
- Testing: [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [Supertest](https://www.npmjs.com/package/supertest)

## Authors

Cillian Hynes

## Contributing

This project is a portfolio piece and is not accepting contributions.

## Acknowledgments

This API was created as part of a project at Northcoders Coding Bootcamp.
A big thank you to everyone involved there.

- [northcoders.com](https://northcoders.com/)
