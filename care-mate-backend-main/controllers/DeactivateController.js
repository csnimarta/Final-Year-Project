const User = require("../models/User"); 

const deactivateAccount =  async (req, res) => {
  try {
    const userId = req.params.id;


    const deactivatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      {
        new: true, 
      }
    );

    if (!deactivatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deactivated" });
  } catch (error) {
    console.error("Error deactivating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
 deactivateAccount  ,
};