const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/TokenController");

router.post("/signup", signup);

module.exports = router;
