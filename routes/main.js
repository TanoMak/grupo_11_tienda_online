const express = require("express");
const router = express.Router();
const path = require("path");
const mainController = require("../controllers/mainController");

router.get("/", mainController.home);

router.get("/login", mainController.login);

router.get("/registro", mainController.register);

router.get("/carrito", mainController.register);

router.get("/detalleDeProducto", mainController.register);

module.exports = {
  router,
  default: router,
};
