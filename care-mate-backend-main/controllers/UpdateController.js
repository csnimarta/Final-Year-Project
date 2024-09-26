const User = require("../models/User");
const Update = require("../models/Update");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: "damtbqero",
  api_key: "991885657848539",
  api_secret: "0vTfLeM08ojIZwXvU2kgmPBLBd0",
});

const updateProfilePicture = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${profile_image}`,
      {
        folder: "profile_image",
      }
    );

    user.profilePicture = {
      profile_imageurl: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    };

    await user.save();

    return res.status(200).json({ message: "Profile picture updated", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// const uploadProfilePicture = upload.single("profilePicture");

// const profilePicture = async (req, res) => {
//   const userId = req.params.userId;

//   uploadProfilePicture(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {

//       return res
//         .status(400)
//         .json({ message: "Multer error", error: err.message });
//     } else if (err) {

//       return res
//         .status(500)
//         .json({ message: "Unknown error", error: err.message });
//     }

//     try {
//       const profilePicture = req.file;

//       const user = await User.findById(userId);

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       user.profilePicture = profilePicture.path;
//       await user.save();

//       return res
//         .status(200)
//         .json({ message: "Profile picture updated successfully", user });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Internal server error", error: error.message });
//     }
//   });
// };

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const { full_name, email_address, phone_number, gender, area } = req.body;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (full_name) {
      user.full_name = full_name;
    }
    if (email_address) {
      user.email_address = email_address;
    }
    if (phone_number) {
      user.phone_number = phone_number;
    }
    if (gender) {
      user.gender = gender;
    }
    if (area) {
      user.area = area;
    }

    user = await user.save();

    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  updateProfile,
  updateProfilePicture,
};
