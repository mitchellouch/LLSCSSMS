const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Workshop = require("../models/workshopSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("users/workshopSearch");
});

router.get("/workshop", (req, res, next) => {
  var payload = createPayload(req.session.user);
  res.status(200).render("users/workshopNew", payload);
});

module.exports = router;
