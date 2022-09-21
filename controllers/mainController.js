const path = require("path");

const mainController = {
  home: (req, res) => {
    res.render("index")
  },
  login: (req, res) => {
    res.render("users/login")
  },
  register: (req, res) => {
    res.render("users/register")
  },
  cart: (req, res) => {
    res.render("products/productCart")
  },
};

module.exports = mainController;
