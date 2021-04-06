const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    apptId: {
      type: String,
      required: true,
      trim: true,
    },
    saitId: {
      type: String,
      required: true,
      trim: true,
    },
    advisorId: {
      type: String,
      required: true,
      trim: true,
    },      
    meetingType: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
      trim: true,
    },
    endDate: {
      type: Date,
      required: true,
      trim: true,
    },
    meetingNotes: {
      type: String,
      //required: true,
      trim: true,
    } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);