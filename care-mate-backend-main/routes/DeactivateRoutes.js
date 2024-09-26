const express = require("express");
const router = express.Router();
const { deactivateAccount } = require("../controllers/DeactivateController");

router.put("/deactivate-account/:id", deactivateAccount);

module.exports = router;
