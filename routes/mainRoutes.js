const express = require("express");
const router = express.Router();
const path = require("path");
const mainController = require("../controllers/mainController");

router.get("/", mainController.home);
<<<<<<< HEAD
router.get("/login", mainController.login);
/* router.get("/registro", mainController.register); */
=======
>>>>>>> main
router.get("/carrito", mainController.cart);




/* module.exports = {
  router,
  default: router,
};
 */

module.exports = router