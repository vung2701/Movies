const express = require("express");
const router = express.Router();

const searchController = require("../app/controllers/SearchController");

router.post("/", searchController.search);
router.get("/", searchController.index);

module.exports = router;
