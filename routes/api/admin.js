const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../models/userSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var searchObj = {};

    // searchObj = {
    //     //saitId: { $regex: req.query.saitId }
    //     request: { type: Boolean, default: true }
    // }

    searchObj = {
        $or: [
            { request: 'true' },
            { request: true }
        ]
    }


    User.find(searchObj)
        .then((results) => res.status(200).send(results))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

router.get("/request/accept/:saitId", (req, res, next) => {
    //request: true -> false
    User.findOneAndUpdate({ saitId: req.params.saitId }, { $set: { request: false } }, { new: true })
        .then(() => res.redirect("/admin")) //redirect /admin
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
});

router.get("/request/decline/:saitId", (req, res, next) => {
    //delete the user
    User.findOneAndDelete({ saitId: req.params.saitId })
        .then(() => res.redirect("/admin")) //redirect /admin
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })

});

module.exports = router;