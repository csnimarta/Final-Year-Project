const Category= require("../models/Category");
const Booking = require("../models/Booking");
const User = require("../models/User");


const bookService = async (req, res) => {
  const { serviceId, userId, bookingDetails } = req.body;

  try {
    
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Create a new booking
    const newBooking = new Booking({
      service: serviceId,
      user: userId,
      details: bookingDetails,
      // Other booking-related fields can be added here
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    res
      .status(200)
      .json({ message: "Service booked successfully", booking: savedBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking service", error: error.message });
  }
};

module.exports = {
  bookService,
};
