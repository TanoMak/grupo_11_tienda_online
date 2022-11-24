const { validationResult } = require("express-validator");
const path = require("path");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");
const e = require("express");


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
  loginProcess: async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('users/login',
        {
          errors: errors.array(),
          oldData: req.body
        });
    } else {

      // Toma datos del body y crea variable usuario
      const { email, password } = req.body;
      let userFound;

      // Busca usario por el mail.
      // Luego compara su password con la del body
      const user = await db.User.findOne({ where: { email: email } });
      const checkPassword = await bcryptjs.compare(password, user.password);

      //  Si la comparacion es true, se asigna a la variable userFound. Y Luego a la variable 'usuario logueado' en session.

      if (checkPassword) {
        userFound = user;
      } else {
        return res.render('users/login',
          {
            errors: [{ msg: 'Invalid credentials' }]
          });
      }

      req.session.usuarioLogueado = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        imageUser: userFound.imageUser,
      };

      // cookies
      if (req.body.remember) {
        res.cookie("recordame", userFound.id, { maxAge: 1000 * 60 * 2 });
      }

      return res.redirect("/products/list");
    }
  },
  profile: (req, res) => {
    return res.render("users/userProfile");
  },
  update: (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('users/userProfile',
        {
          errors: errors.array(),
          oldData: req.body
        });
    } else {
      db.User.update(
        {
          name: req.body.name,
          lastname: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.adress,
          password: bcryptjs.hashSync(req.body.password, 10),
          profile_photo: req.file.filename,
        },
        {
          where: { id: req.session.usuarioLogueado.id }
        }
      )
    }
  },
  softDelete: (req,res) => {


  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("recordame");
    res.redirect("/");
  },
};