const mongoose = require("mongoose");

const USER_TYPES = ["SERVICE-CONSUMER", "SERVICE-PROVIDER"];

const userSchema = new mongoose.Schema({
  email_address: {
    type: String,
    required: true,
    unique: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
  full_name: {
    type: String,
    required: true,
    default: "",
  },
  age: {
    type: Number,
    required: false,
    default: "",
  },
  phone_number: {
    type: String,
    required: true,
    default: "",
  },
  gender: {
    type: String,
    required: false,
    default: "",
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: false,
    default: "",
  },
  cnic_image: {
    type: String,
    required: false,
    default: "",
  },
  user_type: {
    type: String,
    required: false,
    default: "",
  },
  preferences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Interest",
      default: "",
    },
  ],
  isActive: {
    type: Boolean,
    required: [true, "Account status is required!"],
  },
  dateCreated: {
    type: Date,
    required: [true, 'Account date is required!'],
    default: Date.now()
  },
  profilePicture: {
    type: String,
    required: false
  }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
