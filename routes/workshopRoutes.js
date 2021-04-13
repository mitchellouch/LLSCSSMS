const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Workshop = require("../models/workshopSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("users/workshopSearch");
});

router.get("/workshopNew", (req, res, next) => {
  var payload = {
    pageTitle: "New Workshop"
  };
  res.status(200).render("users/workshopNew", payload);
});

router.post("/workshopNew", async (req, res, next) => {
  var workshop = {
    workshopID: req.body.workshopID.trim(),
    workshopType: req.body.workshopType.trim(),
    workshopDesc: req.body.workshopDesc.trim(),
    workshopDate: req.body.workshopDate.trim(),
    workshopLength: req.body.workshopLength.trim(),
    workshopFacilitator: req.body.workshopFacilitator.trim(),
    workshopRequest: req.body.workshopRequest,
    comments: req.body.comments.trim(),
  }

  if (workshop.workshopRequest == "on"){
    workshop.workshopRequest = true;
    workshop.requestProgram = req.body.requestProgram.trim();
    workshop.requestSchool = req.body.requestProgram.trim();
    workshop.requestContact = req.body.requestContact.trim();
    workshop.numAttendees = req.body.numAttendees.trim();
    workshop.avgRating = req.body.avgRating.trim();
  } else {
    workshop.workshopRequest = false;
    workshop.requestProgram = "";
    workshop.requestSchool = "";
    workshop.requestContact = "";
    workshop.numAttendees = "";
    workshop.avgRating = "";
  }

  if (workshop) {
    var workshop = await Workshop.findOne({ workshopID: workshop.workshopID })
      .catch(err => {
        console.log(err);
        payload.success = false;
        payload.message = "Something went wrong.";
        res.status(200).render("users/workshopNew", payload);
      });

    if (workshop == null) {
      Workshop.create(workshop)
        .then(workshop => {
          payload = {
            success: true,
            message: `New Workshop successfully added.`
          }
          res.status(200).render("users/workshopNew", payload);
        });
    } else {
      payload.success = false;
      payload.message = 'Workshop with id ${workshopID} already exists.';
      res.status(200).render("users/workshopNew", payload);
    }
  }
});

router.get("/info/:workshopID", async (req, res, next) => {
  var payload = await getPayload(req.params.workshopID);
  payload.pageTitle = "Workshop Information";
  payload.workshopID = req.params.workshopID;
  res.status(200).render("users/workshopInfo", payload);
});

router.post("/info/:workshopID", async (req, res, next) => {
  //textarea needs to be trim
  req.body.comments = req.body.comments.trim();

  var payload = await getPayload(req.params.workshopID);

  var workshop = await Workshop.findOneAndUpdate({workshopID: req.params.workshopID}, {$set: req.body}, {new: true})
  .catch(error => {
      console.log(error);
      res.sendStatus(400);
  })

  payload.pageTitle = "Workshop Information";
  payload.workshopID = req.params.workshopID;
  payload.success = true;
  payload.message = `Workshop ${req.params.workshopID} successfully updated.`;
  payload.appointmentInfo = workshop;
  res.status(200).render("users/workshopInfo", payload);
});

async function getPayload(workshopID){
  var workshop = await Workshop.findOne({ workshopID: workshopID });

  if(workshop == null) {
      return {};
  }

  return {
      workshopInfo: workshop
  }
}

module.exports = router;
