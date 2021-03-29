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

router.post("/workshopNew", (req, res, next) => {
  var workshopID = req.body.workshopID.trim();
  var workshopType = req.body.workshopType.trim();
  var workshopDesc = req.body.workshopDesc.trim();
  var workshopDate = req.body.workshopDate.trim();
  var workshopLength = req.body.workshopLength.trim();
  var workshopFacilitator = req.body.workshopFacilitator.trim();
  var workshopRequest = req.body.workshopRequest.trim();
  var requestProgram = req.body.requestProgram.trim();
  var requestSchool = req.body.requestProgram.trim();
  var requestContact = req.body.requestContact.trim();
  var numAttendees = req.body.numAttendees.trim();
  var avgRating = req.body.avgRating.trim();

  if (workshopID && workshopType && workshopDesc && workshopDate && workshopLength && workshopFacilitator &&workshopRequest) {

  }
});

module.exports = router;
