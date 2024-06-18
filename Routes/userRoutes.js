const express = require("express");
const userController = require("../Controller/userController");
const tokenValidator = require("../Handler/tokenValidator");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/currentuser", tokenValidator.validate, userController.currentuser);

module.exports = router;
