const express = require("express");
const { cpuStatus } = require("../controller/cpu.controller");
const router = express.Router();

router.get("/status", cpuStatus);

module.exports = router;
