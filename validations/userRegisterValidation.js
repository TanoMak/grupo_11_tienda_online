const {body} = require ("express-validator");
const path = require("path");
const fs = require("fs");

function findAll(){
    const jsonData = fs.readFileSync(path.join(__dirname, "../data/users.json"))
    const data = JSON.parse(jsonData);
    return data;
}

module.exports = {
    registerFormValidation:[
        body('name')
            .notEmpty()
            .withMessage('Por favor escriba su nombre')
            .bail()
            .isLength({min:2})
            .withMessage('Completar con su nombre completo'),
        body ("lastName")
            .notEmpty()
            .withMessage('Por favor escriba su apellido')
            .bail()
            .isLength({min:2})
            .withMessage('Completar con su apellido completo'),
        body ("phone")
            .notEmpty()
            .withMessage("Por favor complete su número de telefono")
            .bail()
            .isLength({min:10})
            .withMessage('El número de telefono debe tener como mínimo 10 caracteres'),
        body("email")
            .notEmpty()
            .withMessage("Campo email incompleto")
            .isEmail()
            .withMessage("formato de email invalido")
            .custom(function(value, {req}){
                const users = findAll()
                const usuarioEncontrado = users.find(function(user){
                    return user.email == value;
                })
                if(usuarioEncontrado){
                    return false
                }else{
                    return true
                }
            }).withMessage("Email ya registrado") ,
        body ("adress")
            .notEmpty()
            .withMessage("Por favor complete su direccion, calle, número y depto si corresponde")
            .bail()
            .isLength({min:2})
            .withMessage('La dirección debe tener como mínimo 2 caracteres'),
        body("password")
            .notEmpty()
            .withMessage("Por favor escriba una contraseña")
            .isLength({min:8})
            .isAlphanumeric()
            .withMessage('La contraseña debe tener como mínimo 8 caracteres y ser alfanumérica'),
        body ("passwordConfim")
            .notEmpty()
            .withMessage("Por favor vuelva a escribar la contraseña")
            .bail()
            .custom(async (confirmPassword, {req}) => {
                const password = req.body.password
           
                // Comprueba si la contraseñas coinciden 
                if(password !== confirmPassword){
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
           

    ]

}