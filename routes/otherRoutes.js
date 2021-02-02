//define app routes with HTTP methods
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Other Page");
});

module.exports = router;
