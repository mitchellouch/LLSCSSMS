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
  var apptType = req.body.meetingType.trim();
  var startDate = req.body.startDate.trim();
  req.body.meetingNotes = req.body.meetingNotes.trim();

  //var payload = req.body;
  //payload.pageTitle = "Student Registration";

  if(apptId && saitId && advisorId && apptType && startDate) {
      var appointment = await Appointment.findOne({ apptId: apptId })
      .catch(err => {
          console.log(err);
          payload.success = false;
          payload.message = "Something went wrong.";
          res.status(200).render("users/appointmentNew", payload);
      });

      if (appointment !== null) {
          //Appointment found
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

router.get("/info/:apptId", async (req, res, next) => {
  var payload = await getPayload(req.params.apptId);
  payload.pageTitle = "Appointment Information";
  payload.apptId = req.params.apptId;
  res.status(200).render("users/appointmentInfo", payload);
});

router.post("/info/:apptId", async (req, res, next) => {
  //textarea needs to be trim
  req.body.comments = req.body.comments.trim();

  var payload = await getPayload(req.params.apptId);

  var appointment = await Appointment.findOneAndUpdate({apptId: req.params.apptId}, {$set: req.body}, {new: true})
  .catch(error => {
      console.log(error);
      res.sendStatus(400);
  })

  payload.pageTitle = "Appointment Information";
  payload.apptId = req.params.apptId;
  payload.success = true;
  payload.message = `#${req.params.apptId} successfully updated.`;
  payload.appointmentInfo = appointment;
  res.status(200).render("users/appointmentInfo", payload);
});

async function getPayload(appointmentId){
  var appointment = await Appointment.findOne({ apptId: appointmentId });

  if(appointment == null) {
      return {};
  }

  return {
      appointmentInfo: appointment
  }
}

module.exports = router;