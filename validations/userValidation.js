const { body } = require("express-validator");
const path = require("path");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");


module.exports = {
    registerFormValidation: [
        body('name')
            .notEmpty()
            .withMessage('Por favor escriba su nombre')
            .bail()
            .isLength({ min: 2 })
            .withMessage('Completar con su nombre completo'),
        body("lastname")
            .notEmpty()
            .withMessage('Por favor escriba su apellido')
            .bail()
            .isLength({ min: 2 })
            .withMessage('Completar con su apellido completo'),
        body("phone")
            .notEmpty()
            .withMessage("Por favor complete su número de telefono")
            .bail()
            .isLength({ min: 10 })
            .withMessage('El número de telefono debe tener como mínimo 10 caracteres'),

        body("email")
            .isEmail()
            .withMessage("El Email debe ser valido")
            .bail()
            .custom(function (value) {
                return db.User.findOne({
                    where: {
                        email: value
                    }
                }).then(user => {
                    if (user) {
                        return Promise.reject("Email ya registrado!")
                    }
                })
            }),

        body("address")
            .notEmpty()
            .withMessage("Por favor complete su direccion, calle, número y depto si corresponde")
            .bail()
            .isLength({ min: 2 })
            .withMessage('La dirección debe tener como mínimo 2 caracteres'),
        body("password")
            .notEmpty()
            .withMessage("Por favor escriba una contraseña")
            .isLength({ min: 8 })
            .isAlphanumeric()
            .withMessage('La contraseña debe tener como mínimo 8 caracteres y ser alfanumérica'),
        body("passwordConfim")
            .notEmpty()
            .withMessage("Por favor vuelva a escribar la contraseña")
            .bail()
            .custom(async (confirmPassword, { req }) => {
                const password = req.body.password

                // Comprueba si la contraseñas coinciden 
                if (password !== confirmPassword) {
                    throw new Error('Las contraseñas no coinciden')
                }
            }),
         body('imageUser').custom((value, { req }) => {
             let file = req.file;
             let acceptedExtensions = ['.jpg', '.png', '.gif'];
 
             if (!file) {
                 throw new Error('Tienes que subir una imagen');
             } else {
                 let fileExtension = path.extname(file.originalname);
                 if (!acceptedExtensions.includes(fileExtension)) {
                     throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                 }
             }
             return true;
         })

    ],

    loginValidation: [
        body("email")
            .notEmpty()
            .withMessage("Completar campo de Email")
            .bail()
            .isEmail()
            .withMessage("Email con formato incorrecto")
            .bail()
            .custom(function (value, { req }) {
                return db.User.findOne({
                    where: {
                        email: value
                    }
                }).then(user => {
                    if (!user) {
                        return Promise.reject("Usuario o contraseña invalidos")
                    }
                    if (!bcryptjs.compareSync(req.body.password, user.password)) {
                        return Promise.reject("Usuario o contraseña invalidos")
                    }
                })
            }),
        body("password")
            .notEmpty()
            .withMessage("Completar campo de contraseña")
    ],

    edit: [
        body('name')
            .notEmpty()
            .withMessage('Por favor escriba su nombre')
            .bail()
            .isLength({ min: 2 })
            .withMessage('Completar con su nombre completo'),
        body("lastname")
            .notEmpty()
            .withMessage('Por favor escriba su apellido')
            .bail()
            .isLength({ min: 2 })
            .withMessage('Completar con su apellido completo'),
        body("phone")
            .notEmpty()
            .withMessage("Por favor complete su número de telefono")
            .bail()
            .isLength({ min: 10 })
            .withMessage('El número de telefono debe tener como mínimo 10 caracteres'),

        body("email")
            .isEmail()
            .withMessage("El Email debe ser valido"),

        body("address")
            .notEmpty()
            .withMessage("Por favor complete su direccion, calle, número y depto si corresponde")
            .bail()
            .isLength({ min: 2 })
            .withMessage('La dirección debe tener como mínimo 2 caracteres'),
/*         body("password")
            .notEmpty()
            .withMessage("Por favor escriba una contraseña")
            .isLength({ min: 8 })
            .isAlphanumeric()
            .withMessage('La contraseña debe tener como mínimo 8 caracteres y ser alfanumérica'), */

    ],
}