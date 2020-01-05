## Thanks for working on this project! 

Where Should We Eat is built on NodeJS, Express, and ReactJS, and deployed on Google Cloud App Engine, using Google Cloud's SQL database.

Below, you can find instructions on running the app on your local machine, how to access and manipulate the Google Cloud SQL database, and how to redeploy.

If you're an Op Spark developer adding a feature to this project for Legacy, reach out to one of the Magnificent Marsupials for `.env` variables, the `app.yaml` file, API keys, and Google Cloud permissions/ownership.

If you have any questions that aren't answered here, the Google Cloud Documentation is pretty stellar.

## 1. Available scripts for development

### To build and render the front end:

In the root directory, run `npm run build` to create a build of the front end.

Then run `npm start` to serve the build and start the backend server on `localhost:8080`. Open `localhost:8080` in your browser to see the build.

### To run the app in dev mode:

`npm run local` runs the app in the development mode.<br />
This should automatically open your browser on [http://localhost:3000](http://localhost:3000).

## 2. Installing and running Google SQL Cloud proxy on your local machine

In order to test or work with our router and database functions, you're going to need to connect to our database, which is hosted on the Google Cloud SQL platform. Follow the steps below to be able to interact with this database on your local machine through a proxy.

### Install Google Cloud SDK

The Google Cloud SDK (software development kit) will grant you permissions to interact with the database, and redeploy a new version of this app when you're ready.

Follow the steps in the [Google Documentation](https://cloud.google.com/sdk/docs/quickstarts) to download and initialize it onto your local machine.

### Install Cloud SQL Proxy

The Cloud SQL Proxy allows you to connect to our Google Cloud SQL database on your local machine.

Follow the commands in the [Google Docs](https://cloud.google.com/sql/docs/mysql/connect-external-app#proxy) to (1) download the SQL proxy, (2) make it executable, and (3) run the proxy in your terminal.

### Save Service Key JSON file on your local machine and add it to `.env`

Ask a Motivated Marsupial for the content of the `where-should-we--1577491661730-acd310b40639.json` file. Save a copy as a file with this exact name in your root directory.

Copy this file's absolute path and save that path as the value of the GOOGLE_APPLICATION_CREDENTIALS variable in `.env`.

Run the CONNECTION SHELL command from the `.env` file to create a connection to the Cloud SQL db. If prompted for a password, enter the DB_PASS from `.env`. Keep this terminal open while working with the database.

It might take a moment to connect to the database. Once you see <br>`listening on /cloudsql/where-should-we--1577491661730:us-central1:marsupials for where-should-we--1577491661730:us-central1:marsupials` and `Ready for new connections`,
in a separate terminal, run the commands in the `schema.sql` file to initialize the database and shell into MYSQL if desired. `use wswe` to manipulate our `wswe` database from within the MYSQL shell.

## 3. Deploy your new feature

Run `npm run build` to make a final build of your new front end. Then run `gcloud app deploy` to deploy the new version of the app.