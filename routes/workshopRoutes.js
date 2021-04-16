const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Workshop = require("../models/workshopSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  var payload = {
    userLoggedIn: req.session.user,
  };
  res.status(200).render("users/workshopSearch", payload);
});

router.get("/workshopNew", (req, res, next) => {
  var payload = {
    pageTitle: "New Workshop",
    userLoggedIn: req.session.user,
  };
  res.status(200).render("users/workshopNew", payload);
});

router.post("/workshopNew", async (req, res, next) => {
  var workshop = {
    workshopRequest: req.body.workshopRequest,
    workshopID: req.body.workshopID.trim(),
    workshopType: req.body.workshopType.trim(),
    workshopDesc: req.body.workshopDesc.trim(),
    workshopDate: req.body.workshopDate.trim(),
    workshopLength: req.body.workshopLength.trim(),
    workshopFacilitator: req.body.workshopFacilitator.trim(),
    comments: req.body.comments.trim(),
    numAttendees: req.body.numAttendees.trim(),
    avgRating: req.body.avgRating.trim(),
  };

  if (workshop.workshopRequest == "on") {
    workshop.workshopRequest = true;
    workshop.requestProgram = req.body.requestProgram.trim();
    workshop.requestSchool = req.body.requestSchool.trim();
    workshop.requestContact = req.body.requestContact.trim();
  } else {
    workshop.workshopRequest = false;
    workshop.requestProgram = "";
    workshop.requestSchool = "";
    workshop.requestContact = "";
  }

  var payload = {
    userLoggedIn: req.session.user,
  };

  if (workshop) {
    var workshopFound = await Workshop.findOne({
      workshopID: workshop.workshopID,
    }).catch((err) => {
      console.log(err);
      payload.success = false;
      payload.message = "Something went wrong.";
      res.status(200).render("users/workshopNew", payload);
    });

    if (workshopFound == null) {
      Workshop.create(workshop).then((workshop) => {
        payload = {
          success: true,
          message: `New Workshop successfully added.`,
          userLoggedIn: req.session.user,
        };
        res.status(200).render("users/workshopNew", payload);
      });
    } else {
      payload.success = false;
      payload.message = `Workshop with id #${workshop.workshopID} already exists.`;
      res.status(200).render("users/workshopNew", payload);
    }
  }
});

router.get("/info/:workshopID", async (req, res, next) => {
  var payload = await getPayload(req.params.workshopID);
  payload.pageTitle = "Workshop Information";
  payload.workshopID = req.params.workshopID;
  payload.userLoggedIn = req.session.user;

  console.log(payload);

  res.status(200).render("users/workshopInfo", payload);
});

router.post("/info/:workshopID", async (req, res, next) => {
  //textarea needs to be trim
  var workshop = {
    workshopRequest: req.body.workshopRequest,
    workshopID: req.params.workshopID.trim(),
    workshopType: req.body.workshopType.trim(),
    workshopDesc: req.body.workshopDesc.trim(),
    workshopDate: req.body.workshopDate.trim(),
    workshopLength: req.body.workshopLength.trim(),
    workshopFacilitator: req.body.workshopFacilitator.trim(),
    comments: req.body.comments.trim(),
    numAttendees: req.body.numAttendees.trim(),
    avgRating: req.body.avgRating.trim(),
  };

  if (workshop.workshopRequest == "on") {
    workshop.workshopRequest = true;
    workshop.requestProgram = req.body.requestProgram.trim();
    workshop.requestSchool = req.body.requestSchool.trim();
    workshop.requestContact = req.body.requestContact.trim();
  } else {
    workshop.workshopRequest = false;
    workshop.requestProgram = "";
    workshop.requestSchool = "";
    workshop.requestContact = "";
  }

  var payload = await getPayload(req.params.workshopID);

  var workshopUpdated = await Workshop.findOneAndUpdate(
    { workshopID: req.params.workshopID },
    { $set: workshop },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  payload.pageTitle = "Workshop Information";
  payload.workshopID = req.params.workshopID;
  payload.success = true;
  payload.message = `Workshop ${req.params.workshopID} successfully updated.`;
  payload.workshopInfo = workshopUpdated;
  payload.userLoggedIn = req.session.user;
  res.status(200).render("users/workshopInfo", payload);
});

async function getPayload(workshopID) {
  var workshop = await Workshop.findOne({ workshopID: workshopID });

  if (workshop == null) {
    return {};
  }

  return {
    workshopInfo: workshop,
  };
}

module.exports = router;
