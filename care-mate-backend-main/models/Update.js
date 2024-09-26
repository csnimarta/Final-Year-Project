const mongoose = require("mongoose");
const updateSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    default: "",
  },
  email_address: {
    type: String,
    required: true,
    unique: true,
    default: "",
  },
  profilePicture: {
    url: {
      type: String,
      required: false,
      default: "",
    },
    public_id: {
      type: String,
      required: false,
      default: "",
    },
  },
});

const UpdateModel = mongoose.model("Update", updateSchema);
module.exports = UpdateModel;
