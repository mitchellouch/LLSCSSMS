const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.status(200).render("users/login");
});

router.post("/", async (req, res, next) => {
  var payload = req.body;

  if (payload.logId && payload.logPassword) {
    var user = await User.findOne({ saitId: payload.logId }).catch((err) => {
      console.log(err);
      payload.errorMessage = "Failed connection to database.";
      res.status(200).render("users/login", payload);
    });

    if (user != null) {
      var checkPassword = await bcrypt.compare(
        payload.logPassword,
        user.password
      );

      if (user.request === true) {
        payload.errorMessage = "Your account is waiting confirmation.";
        return res.status(200).render("users/login", payload);
      }

      if (checkPassword === true) {
        req.session.user = user;
        return res.redirect("/");
      }
    } else {
      payload.errorMessage = "Login credentials incorrect.";
      return res.status(200).render("users/login", payload);
    }
  } else {
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("users/login", payload);
  }
});

module.exports = router;
