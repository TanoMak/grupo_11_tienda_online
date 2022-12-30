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
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: bcryptjs.hashSync(req.body.password, 10),
        profile_photo: req.file.filename,
        admin: 0
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
      console.log("hay errores")
      return res.render("users/login", { errors: errors.mapped() })
    } else {


      // Toma datos del body 
      const { email, password } = req.body;

      // Busca usario por el mail.   
      // Luego compara su password con la del body  

      const user = await db.User.findOne({ where: { email: email } });
      console.log(user)
      const checkPassword = bcryptjs.compareSync(password, user.password);

      //  Si la comparacion es true se asignan los datos a la variable 'usuario logueado' en session.
      if (checkPassword) {
        req.session.usuarioLogueado = user
      }
      // cookies
      if (req.body.remember) {
        res.cookie("recordame", user.id, { maxAge: 1000 * 60 * 2 });
      }

      return res.redirect("/");
    }
  },
  profile: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((users) => {
        res.render("users/userProfile", { users: req.session.usuarioLogueado });
      })

  },

  edit: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((userInfo) => {
        res.render("users/userUpdate", { userInfo: userInfo })
      })


  },
  update: async (req, res) => {
    try {
      let errors = validationResult(req);

      let userInfo = await db.User.findByPk(req.params.id)

      if (!errors.isEmpty()) {
        return res.render("users/userUpdate", {
          errors: errors.mapped(),
          userInfo,
          oldDat: req.body
        })
      } else {
        await db.User.update(
          {
            name: req.body.name,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            /*             password: req.body.password == "" ? userInfo.password : bcryptjs.hashSync(req.body.password, 10),
                        passwordConfim: userInfo.password, */
            profile_photo: req.file == undefined ? userInfo.profile_photo : req.file.filename
          },
          {
            where: { id: userInfo.id }
          }
        )
      }

      let userFound = await db.User.findByPk(userInfo.id)
      req.session.usuarioLogueado = userFound;
      res.redirect("/users/login");
    } catch (error) {
      console.log(error)
    }
  },
  softDelete: (req, res) => {
    db.User.destroy({
      where: { id: req.session.usuarioLogueado.id }
    }).then(() => {
      req.session.destroy();
      res.redirect("/users/login");
    }).catch(error => console.log(error))
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("recordame");
    res.redirect("/");
  },
};