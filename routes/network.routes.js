const express = require("express");
const { networkStatus } = require("../controller/network.controller");
const router = express.Router();

router.get("/status", networkStatus);

module.exports = router;
