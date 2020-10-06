const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const contactAddress = process.env.CONTACT_ADDRESS;

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

router.post("/contact", async (req, res) => {
  await mailer
    .sendMail({
      from: req.body.email,
      to: [contactAddress],
      name: req.body.fullname,
      subject: req.body.object || "[No subject]",
      html:
        `ClientName:${req.body.fullname}  ClientEmail:${req.body.email} Offer_Subject:${req.body.object}` ||
        "[No subject]",
    })
    .then((res) => res.json({ success: true }))
    .catch((e) => res.json({ error: e }));
});

module.exports = router;
