const Interest = require("../models/Interest");

const createInterest = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    const newInterest = new Interest({
      name,
      isActive: isActive || true,
    });

    const savedInterest = await newInterest.save();
    res.status(201).json(savedInterest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.find();
    res.status(200).json(interests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInterest,
  getAllInterests,
};
