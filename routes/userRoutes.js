const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const usersController = require("../controllers/userscontrollers");
const userValidation = require ("../validations/userRegisterValidation")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images/users"));
    },
    filename: function (req, file, cb) {
      const newFilename =
        file.fieldname + Date.now() + "-" + path.extname(file.originalname);
      cb(null, newFilename);
    },
});
  
const upload = multer({ storage: storage });

// Formulario de registro
router.get('/registro', usersController.register);

// Procesar el registro
router.post('/registro', upload.single('image-user'), userValidation.registerFormValidation, usersController.processRegister);

module.exports = router



