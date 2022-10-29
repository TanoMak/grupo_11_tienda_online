const express = require("express");
<<<<<<< HEAD
const router = express.Router();
const path = require("path");
const multer = require("multer");
const usersController = require("../controllers/userscontrollers");
/* const {registerFormValidation} = require ("../validations/userRegisterValidation") */
const validations = require ("../validations/userRegisterValidation")

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
router.get('/login', usersController.login);

// Perfil de usuario
router.get('/micuenta', usersController.profile);

module.exports = router



=======
const {body} = require("express-validator");

const router = express.Router();

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/profile-image")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
})

const uploadFile = multer({ storage })

//controlador
const userController = require("../controllers/userController");

//middlewares
const validations = [
    body("name").notEmpty().withMessage("Tienes que escribir tu nombre"),
    body("phoneNumber").notEmpty().withMessage("Tienes que escribir tu numero de telefono"),
    body("email").notEmpty().withMessage("Tienes que escribir tu email").bail().isEmail().withMessage("Tienes que escribir un formato de correo valido"),
    body("password").notEmpty().withMessage("campo obligatorio"),
    body("profileImage").custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = [".png",".jpg",".gif"]
        let fileExtension = path.extname(file.originalname);

        if (!file) {
            throw new Error("Tienes que subir una imagen");
        } 

        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error("Tienes que subir una imagen");
        }

        return true;
    })
];

//form login
router.get("/login", userController.login);

//form registro
router.get("/register", userController.register);

//proceso registro
router.post("/register", uploadFile.single("profile-image"), validations, userController.processRegister);

module.exports = router;
>>>>>>> main
