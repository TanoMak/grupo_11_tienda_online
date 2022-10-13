const {body} = require("express-validator");
const path = require("path");


const validateRegister = [
    body("name").notEmpty().withMessage("Tienes que escribir tu nombre"),
    body("phoneNumber").notEmpty().withMessage("Tienes que escribir tu numero de telefono"),
    body("email").notEmpty().withMessage("Tienes que escribir tu email").bail().isEmail().withMessage("Tienes que escribir un formato de correo valido"),
    body("password").notEmpty().withMessage("campo obligatorio"),
    body("profileImage").custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = [".png",".jpg",".gif"]

        if (!file) {
            throw new Error("Tienes que subir una imagen");
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){ 
                throw new Error("Tienes que subir una imagen");}
        }

        return true;
    })
];

module.exports = validateRegister;