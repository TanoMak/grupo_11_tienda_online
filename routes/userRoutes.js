const express = require("express");
const {check} = require("express-validator");
const router = express.Router();

//controlador
const userController = require("../controllers/userController");

//middlewares

//form login
router.get("/login", userController.login);

//form registro
router.get("/register", userController.register);

//proceso registro
router.post("/register", userController.processRegister);

module.exports = router;