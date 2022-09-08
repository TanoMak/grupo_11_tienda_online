const path = require("path");

const mainController = {
  home: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  },
  login: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  },
  register: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
  },
  cart: (req, res) => {
    res.sendFile(path.resolve(__dirname, "../views/productCart.html"));
  },
  productDetail: (req, res) => {
    res.sendFile(path.resolve(__dirname, "../views/productDetail.html"));
  },
};

module.exports = mainController;
