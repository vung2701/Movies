const express = require("express");
const router = express.Router();

const validateController = require("../app/controllers/ValidateController");
const CheckUsernameExists = require("../app/middlerwares/CheckUsernameExist");

router.get("/login", validateController.loginForm);
router.get("/register", validateController.registerForm);
router.post("/login", validateController.login);
router.post("/register", CheckUsernameExists, validateController.register);

module.exports = router;
