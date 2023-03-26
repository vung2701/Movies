const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

router.get("/stored-films", meController.storedFilms);
router.get("/trash-films", meController.trashFilms);
router.get("/profile", meController.profile);

module.exports = router;
