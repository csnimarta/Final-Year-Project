const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: {
      date: {
        type: Date,
        required: true,
      },
    },
    
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
