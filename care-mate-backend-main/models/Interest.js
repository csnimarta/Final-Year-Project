const mongoose = require("mongoose");

const InterestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const interestModel = mongoose.model("Interest", InterestSchema);
module.exports = interestModel;
