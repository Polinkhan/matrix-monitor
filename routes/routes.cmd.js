// Modules
const express = require("express");
const router = express.Router();

// Controllers
const Controllers = require("../controller/controller.cmd");

// Routes
router.post("/power", Controllers.Power);

module.exports = router;
