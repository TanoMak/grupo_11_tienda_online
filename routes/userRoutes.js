const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const usersController = require("../controllers/userController");
const authMiddleware = require('../middlewares/authMiddleware');

const validations = require ("../validations/userValidation");
const userController = require("../controllers/userController");

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
router.post('/registro', upload.single('imageUser'), validations.registerFormValidation, usersController.processRegister);

// Formulario de login
router.get("/login", usersController.login);
router.post("/login",validations.loginValidation, usersController.loginProcess);
router.post("/logout", usersController.logout);



// Perfil de usuario
router.get("/profile/:id", authMiddleware, usersController.profile);
// authMiddleware envía al login si el usuario no está logueado

// Formulario para actualizar datos del usuario
router.get("/editar/:id", authMiddleware, usersController.edit);

router.put("editar/:id",  upload.single('imageUser'), validations.registerFormValidation,usersController.update);

// Boton que elimina la cuenta del usuario
// router.delete("profile",userController.softDelete);


module.exports = router
