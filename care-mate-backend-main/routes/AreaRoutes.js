const express = require("express");
const router = express.Router();
// const AreaRoutes = require("../routes/AreaRoutes");

const {createArea, getAreas} = require("../controllers/AreaController");
router.post("/createArea", createArea);
router.get("/getArea", getAreas);

module.exports = router;