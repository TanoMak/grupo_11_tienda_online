const { body } = require("express-validator");
const path = require("path");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");


function recordame (req, res, next){
    if(!req.session.usuarioLogueado && req.cookies.recordame){      
        const userFound = db.User.findByPk(req.cookies.recordame);      

        req.session.usuarioLogueado = {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
        };
    }
    return next()

}
module.exports = recordame;

