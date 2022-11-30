const express = require("express");
const router = express.Router();
const colorsController = require("../controllers/colorsController");

router.get("/", colorsController.list);
router.get("/create", colorsController.create);
router.post("/create", colorsController.store);
router.get("/edit/:id", colorsController.edit);
router.put("/edit/:id", colorsController.update);
router.delete("/delete/:id", colorsController.destroy);




module.exports = router