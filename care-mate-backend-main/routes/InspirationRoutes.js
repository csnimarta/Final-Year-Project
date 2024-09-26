const express = require("express");
const router = express.Router();
const {
  getInspiration,
  addInspiration,
} = require("../controllers/InspirationController");

router.get("/getInspiration", getInspiration);
router.post("/addInspiration", addInspiration);

module.exports = router;
