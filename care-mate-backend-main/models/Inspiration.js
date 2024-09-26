const mongoose = require("mongoose");

const inspirationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  videos: [
    {
      type: String, 
      required: true,
    },
  ],
});

const Inspiration = mongoose.model("Inspiration", inspirationSchema);

module.exports = Inspiration;
