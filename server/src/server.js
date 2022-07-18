const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const gqlServer = require("./graphql/gql-server");
const helmet = require("helmet");
const compression = require("compression");

const connectToMongoDB = require("./datasources/mongodb/db");
const {
    seedUserDB,
    seedTagDB,
    seedEntryDB,
    seedCommentDB
} = require("./datasources/mongodb/seeds");

const port = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

const app = express();
app.use(compression());
app.use(cookieParser());
if (process.env.NODE_ENV !== 'development') {
    app.use(helmet());
}

connectToMongoDB(DB_HOST);

// seed Data (delete if you want to use consistent data)
seedUserDB();
seedTagDB();
seedEntryDB();
seedCommentDB();

gqlServer(app);

app.listen(port, () => {
    console.log(`Der Server läuft auf folgender URL Addresse: 
    http://localhost:${port}/api`);
});