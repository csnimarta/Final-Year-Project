const express = require("express");
const router = express.Router();
const {
  createService,
  getServices,
  findServiceByUser,
  updateService,
  getServicesWithProviders,
  getServiceById,
  banServiceById,
} = require("../controllers/ServiceController");

router.post("/createService", createService);
router.get("/services", getServices);
router.get("/serviceById", findServiceByUser);
router.put("/updateService", updateService);
router.get("/getServicesWithProviders", getServicesWithProviders);
router.get("/getServiceById", getServiceById);
router.put("/banServiceById", banServiceById);

module.exports = router;
