const express = require("express");
const router = express.Router();
const { createSlot, getAllSlot } = require("../controllers/SlotController");

router.post("/createSlot", createSlot)
router.get("/getAllSlot", getAllSlot)
module.exports = router;