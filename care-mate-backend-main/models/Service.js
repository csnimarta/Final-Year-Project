const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  durationType: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  monthlyBudget: {
    type: Number,
    required: false,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  bannedTill: {
    type: String,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
