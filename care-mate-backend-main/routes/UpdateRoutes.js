const express = require("express");
const router = express.Router();
const {
  updateProfile,
  updateProfilePicture,
} = require("../controllers/UpdateController");



router.post("/:userId/profile-picture", updateProfilePicture);

router.put("/:id", updateProfile);
module.exports = router;
