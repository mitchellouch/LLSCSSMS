const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Appointment = require("../../models/appointmentSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var searchObj = {};

    if (req.query.apptId !== undefined) {
        searchObj = {
            $or: [
                { saitId: { $regex: req.query.saitId, $options: "i" } },
                { apptId: { $regex: req.query.apptId, $options: "i" } },
            ]
        }
    } else {
        searchObj = {};
    }

    Appointment.find(searchObj)
        .then(results => res.status(200).send(results))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
});

router.delete("/:appointmentId", (req, res, next) => {

    Appointment.findOneAndDelete({ apptId: req.params.appointmentId })
        .then(() => res.sendStatus(202))
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
})


module.exports = router;