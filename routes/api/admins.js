const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../models/userSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var searchObj = {};

    searchObj = {
        //saitId: { $regex: req.query.saitId }
        request: { type: Boolean, default: true }
    }

    User.find(req.query.saitId)
        .then((results) => res.status(200).send(results))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

module.exports = router;