const { validationResult } = require('express-validator');
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs")


function findAll() {
  const jsonData = fs.readFileSync(
    path.join(__dirname, "../data/users.json")
  );
  const data = JSON.parse(jsonData);
  return data;
}

function writeFile(data) {
  const dataString = JSON.stringify(data, null, 4);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), dataString);
}

module.exports = {
  register: (req, res) => {
    return res.render("users/register")
  },

  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    } else {
      const data = findAll();

      const newUser = {
        id: data.length + 1,
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        adress: req.body.adress,
        password: bcryptjs.hashSync(req.body.password, 10),
        imageUser: req.file.filename
      }

      data.push(newUser);

      console.log(newUser)

      writeFile(data);

      res.redirect("/users/login");
    }
  },

  login: (req, res) => {
    return res.render('users/login');
  },
  loginProcess: (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.render("users/login", { errors: error.mapped() })
    };

    const users = findAll();

    const userFound = users.find(function (user) {
      return user.email == req.body.email && bcryptjs.compareSync(req.body.password, user.password)
    })

    if (!userFound) {
      return res.render("users/login", { errorLogin: 'Credenciales invalidas' });
    } else {
      req.session.usuarioLogueado = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        imageUser: userFound.imageUser
      };

      if (req.body.remember) {
        res.cookie("recordame", userFound.id, { maxAge: 1000 * 60 * 2 })
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

}