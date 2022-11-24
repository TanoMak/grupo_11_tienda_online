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
        body("lastName")
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
            .notEmpty()
            .withMessage("Campo email incompleto")
            .isEmail()
            .withMessage("formato de email invalido")
            .custom(function (thisEmail, { req }) {
                db.User.findOne({ where: { email: thisEmail } })
                    .then((user) => {
                        if (user) {
                            console.log(user);
                           return Promise.reject('E-mail already in use');
                        } else {
                            return true;
                        }
                    })
                    .catch(error => console.log(error))
            }).withMessage("Email ya registrado"),
        body("adress")
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
            .withMessage("Ingresar e-mail"),
        body("password")
            .notEmpty()
            .withMessage("Ingresar contraseña")
    ]

}