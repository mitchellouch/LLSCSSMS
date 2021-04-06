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
  var workshopID = req.body.workshopID.trim();
  var workshopType = req.body.workshopType.trim();
  var workshopDesc = req.body.workshopDesc.trim();
  var workshopDate = req.body.workshopDate.trim();
  var workshopLength = req.body.workshopLength.trim();
  var workshopFacilitator = req.body.workshopFacilitator.trim();
  var workshopRequest = req.body.workshopRequest.trim();
  /**var requestProgram = req.body.requestProgram.trim();
  var requestSchool = req.body.requestProgram.trim();
  var requestContact = req.body.requestContact.trim();
  var numAttendees = req.body.numAttendees.trim();
  var avgRating = req.body.avgRating.trim();*/
  if (workshopRequest == "on"){
    req.body.workshopRequest = true;
  } else {
    req.body.workshopRequest = false;
  }

  if (workshopID && workshopType && workshopDesc && workshopDate && workshopLength && workshopFacilitator && workshopRequest) {
    var workshop = await Workshop.findOne({ workshopID: workshopID })
      .catch(err => {
        console.log(err);
        //payload.success = false;
        //payload.message = "Something went wrong.";
        //res.status(200).render("users/workshopNew", payload);
        res.status(200).render("users/workshopNew");
      });

    if (workshop == null) {
      Workshop.create(req.body)
        .then(workshop => {
          //payload = {
          //    success: true,
          //    message: `New Workshop successfully added.`
          //}
          res.status(200).render("users/workshopNew");
        });
    } else {
      /**payload.success = false;
      payload.message = 'Workshop with id ${workshopID} already exists.';*/
      res.status(200).render("users/workshopNew");
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
