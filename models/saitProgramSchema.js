const mongoose = require("mongoose");

const saitProgramSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }
  }
);

module.exports = mongoose.model("SaitProgram", saitProgramSchema);
