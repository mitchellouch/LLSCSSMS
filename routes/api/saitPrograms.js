const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const SaitProgram = require("../../models/saitProgramSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    SaitProgram.find()
    .then(results => res.status(200).send(results))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    })
});



module.exports = router;
