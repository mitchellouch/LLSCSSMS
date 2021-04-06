const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("users/mainpage");
});

module.exports = router;
