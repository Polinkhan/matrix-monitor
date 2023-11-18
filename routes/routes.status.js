// Modules
const express = require("express");
const router = express.Router();

// Controllers
const Controllers = require("../controller/controller.status");

// Routes
router.get("/", Controllers.Ping);
router.get("/cpu", Controllers.Cpu);
router.get("/disk", Controllers.Disk);
router.get("/memory", Controllers.Memory);
router.get("/network", Controllers.Network);
router.post("/process", Controllers.Processes);

module.exports = router;
