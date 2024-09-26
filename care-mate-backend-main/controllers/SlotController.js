const Slot = require("../models/Slot");


const createSlot= async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const newSlot = new Slot({
      startDate,
      endDate,
    });

    const savedSlot = await newSlot.save();

    res.status(201).json(savedSlot);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Example: Get all slots
const getAllSlot= async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports ={
createSlot,
getAllSlot,
}
