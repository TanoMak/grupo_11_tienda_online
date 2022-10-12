const express = require("express");
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