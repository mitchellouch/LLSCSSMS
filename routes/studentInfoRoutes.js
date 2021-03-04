const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var payload = createPayload(req.session.user);
    res.status(200).render("users/studentInfo", payload);
});

router.get("/register", (req, res, next) => {
    var payload = createPayload(req.session.user);
    res.status(200).render("users/studentRegister", payload);
});

router.get("/appointment", (req, res, next) => {
    var payload = createPayload(req.session.user);
    res.status(200).render("users/appointmentNew", payload);
});

router.post("/register", async (req, res, next) => {
    var saitId = req.body.saitId.trim();
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var studentPhone = req.body.studentPhone.trim();
    var studentEmail = req.body.studentEmail.trim();
    var personalEmail = req.body.personalEmail.trim();
    var academicStatus = req.body.academicStatus.trim();
    var comments = req.body.comments.trim();

    var payload = req.body;

    if(saitId && firstName && lastName) {
        var student = await Student.findOne({ saitId: saitId })
        .catch(err => {
            console.log(err);
            payload.success = false;
            payload.message = "Something went wrong.";
            res.status(200).render("users/studentRegister", payload);
        });

        if (student == null) {
            //No student found
            var data = req.body;

            Student.create(data)
            .then(student => {
                payload = {
                    success: true,
                    message: `New student #${saitId} successfully added.`
                }
                res.status(200).render("users/studentRegister", payload);
            });
        }
        else {
            payload.success = false;
            payload.message = `Provided SAIT ID #${saitId} is already registered.`;
            res.status(200).render("users/studentRegister", payload);
        }
    }
    else {
        payload.success = false;
        payload.message = "Make sure each field has a valid value.";
    }
});

function createPayload(userLoggedIn) {
    return {
        pageTitle: "Student Information"
        //more data will be added here if needed
    };
}

module.exports = router;
