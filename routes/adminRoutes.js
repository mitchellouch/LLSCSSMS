const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Workshop = require("../models/userSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    res.status(200).render("users/adminRequest");
});


module.exports = router;