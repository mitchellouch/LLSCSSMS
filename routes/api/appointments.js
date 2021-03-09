const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Appointment = require("../../models/appointmentSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var searchObj = {};

<<<<<<< HEAD
    if(req.query.saitId !== undefined){ 
=======
    //if(req.query.search !== undefined){ 
>>>>>>> 158c51126b522c7720b0720bdd5be948b06b0b1b
        searchObj = {
            //$or: [
                //{ apptId: { $regex: req.query.apptId, $options: "i" } },
                //{
                saitId: { $regex: req.query.saitId } //, $options: "i" } },
            //]
        }
    // }
    // else {
    //     searchObj = {};
    // }

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