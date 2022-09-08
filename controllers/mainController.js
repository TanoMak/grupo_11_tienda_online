const path = require("path");

const mainController = {
  home: (req, res) => {
    res.render("index")
  },
  login: (req, res) => {
    res.render("login")
  },
  register: (req, res) => {
    res.render("register")
  },
  cart: (req, res) => {
    res.render("productCart")
  },
  productDetail: (req, res) => {
    res.render("productDetail")
  },
};

module.exports = mainController;
