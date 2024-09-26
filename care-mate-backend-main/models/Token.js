const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
});

const TokenModel = mongoose.model("Token", TokenSchema);

module.exports = TokenModel;
