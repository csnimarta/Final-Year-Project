const express = require("express");
const router = express.Router();

const {
  createInterest,
  getAllInterests,
} = require("../controllers/InterestController");

router.post("/createInterest", createInterest);
router.get("/getAllInterests", getAllInterests);

module.exports = router;
