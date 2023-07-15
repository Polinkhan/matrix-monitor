const express = require("express");
const { serviceStatus } = require("../controller/services.controller");
const router = express.Router();

router.post("/status", serviceStatus);

module.exports = router;
