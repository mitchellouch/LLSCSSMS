//test schema for student

const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  studentPhone: String,
  studentEmail: String,
  personalEmail: String,
  academicStatus: String,
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
