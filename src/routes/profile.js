const express = require("express");
const router = express.Router();

const profileController = require("../app/controllers/ProfileController");

router.get("/", profileController.detail);
router.get("/upload", profileController.upload);
router.post("/save", profileController.save);

module.exports = router;
