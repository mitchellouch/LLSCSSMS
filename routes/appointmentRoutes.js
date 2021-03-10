const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Appointment = require("../models/appointmentSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("users/appointmentSearch");
});

router.get("/appointment", (req, res, next) => {
  var payload = createPayload(req.session.user);
  res.status(200).render("users/appointmentNew", payload);
});

router.get("/appointment", (req, res, next) => {
  var payload = createPayload(req.session.user);
  res.status(200).render("users/appointmentNew", payload);
});

module.exports = router;