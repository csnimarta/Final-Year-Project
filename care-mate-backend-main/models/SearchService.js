const mongoose = require("mongoose");

const SearchserviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const SearchService = mongoose.model("Service", SearchserviceSchema);

module.exports = SearchService;
