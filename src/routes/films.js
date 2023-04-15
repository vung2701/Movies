const express = require("express");
const router = express.Router();

const filmsController = require("../app/controllers/FilmsController");

router.get("/edit/:id", filmsController.edit);
router.post("/update/:id", filmsController.update);
router.delete("/delete/:id", filmsController.delete);
router.patch("/restore/:id", filmsController.restore);
router.delete("/destroy/:id", filmsController.destroy);
router.post("/handle-form-actions", filmsController.handleFormActions);
router.get("/create", filmsController.create);
router.post("/store", filmsController.store);
router.get("/", filmsController.films);
router.get("/:slug", filmsController.detail);

module.exports = router;
