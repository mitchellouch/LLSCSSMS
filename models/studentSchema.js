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
    academicStatus: String,
    program: String,
    comments: String,
    semester: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
