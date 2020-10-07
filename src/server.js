const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
const MailerRouter = require("./mailer");

app.use(bodyParser.json());
app.use(cors());

app.use("/.netlify/functions/server", MailerRouter);

module.exports = app;
module.exports.handler = serverless(app);
