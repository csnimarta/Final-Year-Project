const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const SlotModel = mongoose.model("Slot", SlotSchema);

module.exports = SlotModel;
