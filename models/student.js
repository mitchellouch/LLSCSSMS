//test schema for student

const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentID: {
    type: Number,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentPhone: String,
  studentEmail: String,
  personalEmail: String,
  academicStatus: String,
});

module.exports = mongoose.model("Student", studentSchema);
