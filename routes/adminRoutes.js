const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Workshop = require("../models/userSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  var payload = {
    userLoggedIn: req.session.user,
  };
  res.status(200).render("users/adminRequest", payload);
});


router.get("/backup", (req, res, next) => {
  var payload = {
    userLoggedIn: req.session.user,
  };
  res.status(200).render("users/adminBackup", payload);
});

module.exports = router;
