const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const MailerRoute = require("./mailer");
app.use(bodyParser.json());
app.use(cors());
app.use(MailerRoute);
app.use("/.netlify/functions/server", MailerRoute);
app.use("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist/index.html"))
);

module.exports = app;
module.exports.handler = serverless(app);
