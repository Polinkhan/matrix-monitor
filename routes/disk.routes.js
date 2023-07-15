const express = require("express");
const { diskStatus } = require("../controller/disk.controller");
const router = express.Router();

router.get("/status", diskStatus);

module.exports = router;
