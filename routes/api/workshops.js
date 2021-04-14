const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Workshop = require("../../models/workshopSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  var searchObj = {};
  if (req.query.workshopID !== undefined) {
    searchObj = {
      $or: [
        { workshopID: { $regex: req.query.workshopID, $options: "i" } },
      ],
    };
  } else 
    searchObj = {};

  Workshop.find(searchObj)
    .then((results) => res.status(200).send(results))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.delete("/:workshopID", (req, res, next) => {
  Workshop.findOneAndDelete({ workshopID: req.params.workshopID })
    .then(() => res.sendStatus(202))
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

module.exports = router;
