const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("users/appointment");
});

module.exports = router;