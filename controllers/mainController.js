const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const mainController = {
  home: async (req, res) => {
    let products = await db.Product.findAll({ 
      include: [{ association: "images" }],
      order : [["price", "ASC"]],
      limit : 20
    })
    let users = req.session.usuarioLogueado

    res.render('index', {
      products: products,
      users: users
    })
  },
  cart: (req, res) => {
    res.render("products/productCart")
  },
};

module.exports = mainController;
