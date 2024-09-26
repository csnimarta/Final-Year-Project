const Inspiration = require("../models/Inspiration");

const getInspiration = async (req, res) => {
  try {
    const inspirationItems = await Inspiration.find();
    res.status(200).json(inspirationItems);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving inspiration items",
        error: error.message,
      });
  }
};

const addInspiration = async (req, res) => {
  const { images, videos } = req.body;

  try {
    const newInspiration = new Inspiration({
    
      images,
      videos,
    });

    const savedInspiration = await newInspiration.save();
    res.status(201).json(savedInspiration);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding inspiration item", error: error.message });
  }
};

module.exports = {
  getInspiration,
  addInspiration,
};
