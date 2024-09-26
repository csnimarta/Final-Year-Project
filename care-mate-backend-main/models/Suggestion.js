const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema({
  email_address: {
    type: String,
    required: true,
    unique: true,
    default: "",
  },

  interests: {
    type: String,
    required: true,
  },
});

const suggestionModel = mongoose.model("Suggestion", SuggestionSchema);
module.exports = suggestionModel;
