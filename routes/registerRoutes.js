const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("users/userRegister");
});

router.post("/", async (req, res, next) => {
  // listed data below are just sample data to create it, need to change dynamically
  var id = req.body.saitId.trim();
  var firstName = req.body.firstName.trim();
  var lastName = req.body.lastName.trim();
  var email = req.body.email.trim();
  var phone = req.body.phone.trim();
  var password = req.body.password;

  var payload = req.body;

  if (id && firstName && lastName && email && password) {
    var user = await User.findOne({ saitId: id }).catch((err) => {
      console.log(err);
      payload.errorMessage = "Something went wrong.";
      res.status(200).render("users/userRegister", payload);
    });

    if (user == null) {
      // No user found
      var data = req.body;

      data.password = await bcrypt.hash(password, 10);

      User.create(data).then((user) => {
        //req.session.user = user;
        //return res.redirect("/");
        payload.successMessage = "Registration request is sent to Admin";
        return res.status(200).render("users/login", payload);
      });
    } else {
      // User found
      payload.errorMessage = "This SAIT ID is already in use.";
      res.status(200).render("users/userRegister", payload);
    }
  } else {
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("users/userRegister", payload);
  }
});

module.exports = router;
