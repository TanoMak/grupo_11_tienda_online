const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const productsController = require("../controllers/productsController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const newFilename =
      file.fieldname + Date.now() + "-" + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

router.get("/list", productsController.list);
router.get("/detail/:id", productsController.productDetail);
router.get("/create", productsController.add);
router.post("/create", upload.single("image"), productsController.store);
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.single("image"),productsController.update)
router.delete("/delete/:id", productsController.destroy)

module.exports = router;
