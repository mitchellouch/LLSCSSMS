const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Workshop = require("../../models/workshopSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  var searchObj = {};

  searchObj = {
    $or: [
      { saitId: { $regex: req.query.saitId, $options: "i" } },
      { apptId: { $regex: req.query.workshopId, $options: "i" } },
    ],
  };

  Workshop.find(searchObj)
    .then((results) => res.status(200).send(results))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.delete("/:workshopId", (req, res, next) => {
  Workshop.findOneAndDelete({ workshopId: req.params.workshopId })
    .then(() => res.sendStatus(202))
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

module.exports = router;
