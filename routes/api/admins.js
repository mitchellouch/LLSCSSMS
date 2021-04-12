/*
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Student = require("../../models/adminSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var searchObj = {};

    if(req.query.saitId !== undefined){ //id search
        searchObj = {
            saitId: { $regex: req.query.saitId } 
        }
    }
    else if(req.query.name !== undefined) {  //name search
        searchObj = {
            $or: [
                { firstName: { $regex: req.query.name, $options: "i" } },
                { lastName: { $regex: req.query.name, $options: "i" } },
            ]
        }
    }
    else {
        searchObj = {};
    }

    Student.find(searchObj)
    .then(results => res.status(200).send(results))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    })
    
});


module.exports = router;

**/