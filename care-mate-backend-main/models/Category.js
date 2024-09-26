const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  durationType: {
    type: String,
    required: true,
  },
  preferenceName: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
