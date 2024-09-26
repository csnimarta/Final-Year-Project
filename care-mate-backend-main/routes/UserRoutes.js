const express = require("express");
const router = express.Router();

const {
  login, signup,
  getServiceProviders,
  deleteUser,
  approveUser,
  updateUserLocation, fetchUserById, updateUserPassword, updateUserProfilePic
} = require("../controllers/UserController");

router.post("/login", login);
router.post("/signup", signup);
router.get("/service-providers", getServiceProviders);
router.delete("/delete-user", deleteUser);
router.get("/approve-user", approveUser);
router.patch("/updateUserLocation", updateUserLocation);
router.get('/fetchUserById', fetchUserById);
router.patch('/updateUserPassword', updateUserPassword);
router.patch('/updateUserProfilePic', updateUserProfilePic);

module.exports = router;
