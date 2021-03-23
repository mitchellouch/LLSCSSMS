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
      type: String,
      required: true,
      trim: true,
    },
    workshopStartTime: {
      type: String,
      required: true,
      trim: true,
    },
    workshopLength: {
      type: String,
      required: true,
      trim: true,
    },
    workshopFacilitator: {
      type: String,
      required: true,
      trim: true,
    },
    facilitatorContact: {
      type: String,
      required: true,
      trim: true,
    },
    workshopRequest: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workshop", workshopSchema);
