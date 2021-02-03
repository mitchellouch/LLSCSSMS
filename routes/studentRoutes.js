//define app routes with HTTP methods
const express = require("express");
const router = express.Router();
const Student = require("../models/studentSchema");

router.get("/", (req, res) => {
  res.send("Student Page");
});

router.post("/", (req, res) => {
  const student = new Student({
    studentID: req.body.studentID,
    studentName: req.body.studentName,
    studentPhone: req.body.studentPhone,
    studentEmail: req.body.studentEmail,
    personalEmail: req.body.personalEmail,
    academicStatus: req.body.academicStatus,
  });

  student
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

module.exports = router;
