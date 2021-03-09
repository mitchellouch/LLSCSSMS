const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Appointment = require("../../models/appointmentSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var searchObj = {};

    if(req.query.search !== undefined){ 
        searchObj = {
            $or: [
                { apptId: { $regex: req.query.search, $options: "i" } },
                { saitId: { $regex: req.query.search, $options: "i" } },
            ]
        }
    }
    else {
        searchObj = {};
    }

    Appointment.find(searchObj)
    .then(results => res.status(200).send(results))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    })
    
});

/**router.delete("/:studentId", (req, res, next) => {
    
    Appointment.findOneAndDelete({saitId: req.params.studentId})
    .then(() => res.sendStatus(202))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})
*/

module.exports = router;