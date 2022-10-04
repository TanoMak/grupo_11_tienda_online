const path = require("path");
const fs = require("fs");


const mainController = {
  home: (req, res) => {
    res.render("index")
  },
  cart: (req, res) => {
    res.render("products/productCart")
  },

};

module.exports = mainController;
