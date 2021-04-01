const mongoose = require("mongoose");
const workshopSchema = mongoose.Schema(
  {
    workshopID: {
      type: String,
      required: true,
      trim: true,
    },
    workshopType: {
      type: String,
      required: true,
      trim: true,
    },
    workshopDesc: {
      type: String,
      required: true,
      trim: true,
    },
    workshopDate: {
      type: Date,
      required: true,
      trim: true,
    },
    workshopLength: {
      type: Number,
      trim: true,
    },
    workshopFacilitator: {
      type: String,
      required: true,
      trim: true,
    },
    workshopRequest: {
      type: String,
      required: true,
      trim: true,
    },
    requestProgram: {
      type: String,
      trim: true,
    },
    requestSchool: {
      type: String,
      trim: true,
    },
    requestContact: {
      type: Boolean,
      trim: true,
    },
    numAttendees: {
      type: Number,
    },
    avgRating: {
      type: Number,
    },
    comments: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workshop", workshopSchema);
