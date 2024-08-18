// ------------------------------------------
// Modules
// ------------------------------------------
const express = require("express");
const router = express.Router();

// ------------------------------------------
// Controllers
// ------------------------------------------
const { cpuStatus } = require("../controller/cpu.controller");
const { diskStatus } = require("../controller/disk.controller");
const { networkStatus } = require("../controller/network.controller");
const { serviceStatus } = require("../controller/services.controller");

// ------------------------------------------
// Routes
// ------------------------------------------
router.get("/cpu", cpuStatus);
router.get("/disk", diskStatus);
router.get("/network", networkStatus);
router.post("/services", serviceStatus);

module.exports = router;
