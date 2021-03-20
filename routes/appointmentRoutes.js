const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Appointment = require("../models/appointmentSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("users/appointmentSearch");
});

router.get("/apptRegister", (req, res, next) => {
  var payload = {
    pageTitle: "New Appointment"
  };
  res.status(200).render("users/appointmentNew", payload);
});

router.post("/apptRegister", async (req, res, next) => {
  var apptId = req.body.apptId.trim();
  var saitId = req.body.saitId.trim();
  var advisorId = req.body.advisorId.trim();
  var apptType = req.body.apptType.trim();
  var startDate = req.body.startDate.trim();

  // var studentPhone = req.body.studentPhone.trim();
  // var studentEmail = req.body.studentEmail.trim();
  // var personalEmail = req.body.personalEmail.trim();
  // var academicStatus = req.body.academicStatus.trim();
  // var comments = req.body.comments.trim();

  //textarea needs to be trim
  req.body.meetingNotes = req.body.meetingNotes.trim();

  //var payload = req.body;
  //payload.pageTitle = "Student Registration";

  if(apptId && saitId && advisorId && apptType && startDate) {
      var student = await Student.findOne({ saitId: saitId })
      .catch(err => {
          console.log(err);
          payload.success = false;
          payload.message = "Something went wrong.";
          res.status(200).render("users/appointmentNew", payload);
      });
      var appointment;
      if (student !== null) {
          //Student found
          var data = req.body;

          Appointment.create(data)
          .then(appointment => {
              payload = {
                  success: true,
                  message: `New appointment for student #${saitId} successfully added.`
              }
              res.status(200).render("users/appointmentNew", payload);
          });
      }
      else {
          payload.success = false;
          payload.message = `Provided SAIT ID #${saitId} does not exist.`;
          res.status(200).render("users/appointmentNew", payload);
      }
  }
  else {
      payload.success = false;
      payload.message = "Make sure each field has a valid value.";
  }
});

module.exports = router;