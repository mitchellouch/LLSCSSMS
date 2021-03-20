const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    saitId: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    studentPhone: String,
    studentEmail: String,
    personalEmail: String,
    comments: String,
    eaInfo: {
      program: String,
      semester: Number,
      academicStatus: String,
      numOfTries: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
