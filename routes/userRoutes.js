const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const usersController = require("../controllers/userscontrollers");
const {registerFormValidation} = require ("../validations/userRegisterValidation")

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
  
const upload = multer({ 
  storage: storage, 
  fileFilter: (req, file, cb)=>{
      const extensionesAceptadas = ['.jpg', '.png', '.txt'];

      const info = path.extname(file.originalname)

      const result = extensionesAceptadas.includes(info)

    
      if(!result){
          req.file = file;
      }
      //------------------------------//

      cb(null, result);
  } 
})


// Formulario de registro
router.get('/registro', usersController.register);

// Procesar el registro
router.post('/registro', upload.single('imageUser'), registerFormValidation, usersController.processRegister);

// Formulario de login
router.get('/login', usersController.login);

module.exports = router



