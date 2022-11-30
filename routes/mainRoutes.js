const express = require("express");
const router = express.Router();
const path = require("path");
const mainController = require("../controllers/mainController");

router.get("/", mainController.home);
router.get("/carrito", mainController.cart);

// Listado de productos en oferta en el home //
/* router.get("/", mainController.offer); */




/* module.exports = {
  router,
  default: router,
};
 */

module.exports = router