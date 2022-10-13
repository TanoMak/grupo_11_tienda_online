const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const userController = {
  login: (req, res) => {
    return res.render("users/login");
  },
  loginProcess: (req, res) => {
    let userToLogin = User.findByField("email", req.body.email);

    if(userToLogin){
      let isOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
      if(isOk){
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        res.send("ok")
      };
      return res.render("users/login", {
        errors: {
          email: {
            msg: "las credenciales son inválidas"
          }
        }
      })

    };

    return res.render("users/login", {
      errors: {
        email: {
          msg: "no se encuentra"
        }
      }
    })
  },
  profile: (req, res) => {
    return res.render("users/userProfile", {
      user: req.session.userLogged
    })
  },
  logout: (req, res) => {
    req.session.destroy();  
    return res.redirect("/")
  },

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
    }

    let userInDB = User.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("users/register", {
        errors: {
          email: {
            msg: "email ya ingresado",
          },
        },
        oldData: req.body,
      });
    }

    let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      image: req.file.filename,
    };

    let userCreated = User.create(userToCreate);

    res.redirect("users/login");
  },


};

module.exports = userController;
