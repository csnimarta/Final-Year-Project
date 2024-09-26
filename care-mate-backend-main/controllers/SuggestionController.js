const Suggestion = require("../models/Suggestion");
const User = require("../models/User");

const getSuggestedUsers = async () => {
  try {
    // Fetch all users
    const allUsers = await User.find();

    // Randomly select a current user for demonstration purposes
    const currentUserIndex = Math.floor(Math.random() * allUsers.length);
    const currentUser = allUsers[currentUserIndex];

    if (!currentUser) { res
      .status(500)
      .json({ message: "Current user not found", error: error.message });

      
    }

    // Fetch other users who have at least one common interest with the current user
    const suggestedUsers = await User.find({
      _id: { $ne: currentUser._id }, // Exclude the current user
      interests: { $in: currentUser.interests }, // Find users with common interests
    }).limit(5); // Limit the number of suggested users

    return suggestedUsers;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getSuggestedUsers,
};