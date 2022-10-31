const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const userController = {
  login: (req, res) => {
    return res.render("users/login");
  },
  loginProcess: (req, res) => {
    let userToLogin = User.findByField("email", req.body.email);

    if (userToLogin) {
      let isOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
      if (isOk) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 });
        }

        res.redirect("users/profile");
      }
      return res.render("users/login", {
        errors: {
          email: {
            msg: "las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("users/login", {
      errors: {
        email: {
          msg: "no se encuentra",
        },
      },
    });
  },
  profile: (req, res) => {
    return res.render("users/userProfile", {
      user: req.session.userLogged,
    });
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  register: (req, res) => {},
  processRegister: (req, res) => {},
};

module.exports = userController;
