const express = require("express");
const router = express.Router();

const {
  getSuggestedUsers
  //   userId,
} = require("../controllers/SuggestionController");

router.post("/getSuggestedUsers", getSuggestedUsers);
// router.get("/userId", userId);

module.exports = router;
