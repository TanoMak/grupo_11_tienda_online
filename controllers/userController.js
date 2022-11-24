const { validationResult } = require("express-validator");
const path = require("path");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");


module.exports = {
  register: (req, res) => {
    return res.render("users/register");
  },

  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {
      db.User.create({
        name: req.body.name,
        lastname: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.adress,
        password: bcryptjs.hashSync(req.body.password, 10),
        profile_photo: req.file.filename,
      });

      res.redirect("/users/login");
    }
  },

  login: (req, res) => {
    return res.render("users/login");
  },
  loginProcess: (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.render("users/login", { errors: error.mapped() });
    }

    let userFound = db.User.findOne({
      where: {
        email: req.body.email,
        password: bcryptjs.compareSync(req.body.password, user.password),
      }
    }).then(() => {

    });

    if (!userFound) {
      return res.render("users/login", {
        errorLogin: "Credenciales invalidas",
      });
    } else {
      req.session.usuarioLogueado = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        imageUser: userFound.imageUser,
      };

      if (req.body.remember) {
        res.cookie("recordame", userFound.id, { maxAge: 1000 * 60 * 2 });
      }

      res.redirect("/products/list");
    }
  },
  profile: (req, res) => {
    return res.render("users/userProfile");
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("recordame");
    res.redirect("/");
  },
};