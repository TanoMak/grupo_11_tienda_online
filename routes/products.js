const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");

router.get("/list", productsController.list);
router.get("/registroProducto", productsController.register);
router.post("/registroProducto/:id", productsController.register);
router.get("/detalleDeProducto", productsController.productDetail);

module.exports = router;