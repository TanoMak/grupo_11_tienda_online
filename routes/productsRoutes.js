const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const productsController = require("../controllers/productsController");
const admin = require('../middlewares/adminMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/product-images"));
  },
  filename: function (req, file, cb) {
    const newFilename =
      file.fieldname + Date.now() + "-" + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage })

router.get("/list", productsController.list);
router.get("/detail/:id", productsController.productDetail);
router.get("/create",admin, productsController.add);
router.post("/create", upload.any("image"), admin, productsController.store);
router.get("/edit/:id", admin,productsController.edit);
router.put("/edit/:id",upload.any("image"), admin, productsController.update)
router.delete("/delete/:id",admin ,productsController.destroy)
router.get("/search", productsController.search);

module.exports = router;
