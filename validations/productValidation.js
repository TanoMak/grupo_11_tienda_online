const { body } = require("express-validator");
const db = require("../database/models");

module.exports = {
    create: [
        body('code')
            .notEmpty()
            .withMessage('Ingrese el codigo')
            .bail()
            .isLength({ max: 5 })
            .withMessage('El codigo debe tener un maximo de 5 caracteres'),
        body("name")
            .notEmpty()
            .withMessage('Ingrese el nombre del producto')
            .bail()
            .isLength({ min: 5 })
            .withMessage('Debe tener como minimo 5 caracteres '),
        body("description")
            .notEmpty()
            .withMessage("Ingrese la descripcion del producto")
            .bail()
            .isLength({ min: 20 })
            .withMessage('La descripcion  debe tener como mínimo 20 caracteres'),
        body("line")
            .notEmpty()
            .withMessage("Debe seleccionar una línea"),
        body("size")
            .notEmpty()
            .withMessage("Debe seleccionar al menos un talle"),
        body("color")
            .notEmpty()
            .withMessage("Debe seleccionar al menos un color"),
        body("category")
            .notEmpty()
            .withMessage("Debe seleccionar una categoria"),
        body("price")
            .notEmpty()
            .withMessage("El producto debe tener un precio")
            .isNumeric()
            .withMessage('Solo de admiten números'),
        body('image').custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.png', '.gif'];

            if (!file) {
                throw new Error('Tienes que subir entre una y cinco imagenes');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
        })

    ],
    edit: [
        body('code')
            .notEmpty()
            .withMessage('Ingrese el codigo')
            .bail()
            .isLength({ max: 5 })
            .withMessage('El codigo debe tener un maximo de 5 caracteres'),
        body("name")
            .notEmpty()
            .withMessage('Ingrese el nombre del producto')
            .bail()
            .isLength({ min: 5 })
            .withMessage('Debe tener como minimo 5 caracteres '),
        body("description")
            .notEmpty()
            .withMessage("Ingrese la descripcion del producto")
            .bail()
            .isLength({ min: 20 })
            .withMessage('La descripcion  debe tener como mínimo 20 caracteres'),
        body("line")
            .notEmpty()
            .withMessage("Debe seleccionar una línea"),
        body("size")
            .notEmpty()
            .withMessage("Debe seleccionar al menos un talle"),
        body("color")
            .notEmpty()
            .withMessage("Debe seleccionar al menos un color"),
        body("category")
            .notEmpty()
            .withMessage("Debe seleccionar una categoria"),
        body("price")
            .notEmpty()
            .withMessage("El producto debe tener un precio")
            .isNumeric()
            .withMessage('Solo de admiten números'),


    ]



}