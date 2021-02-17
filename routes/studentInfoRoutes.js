const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var payload = createPayload(req.session.user);
    res.status(200).render("users/studentInfo", payload);
});

router.post("/", async (req, res, next) => {
 
});

function createPayload(userLoggedIn) {
    return {
        pageTitle: "Student Information"
        //more data will be added here if needed
    };
}

module.exports = router;
