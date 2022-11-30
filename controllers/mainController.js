const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const mainController = {
  home: (req, res) => {
    res.render("index")
  },
  cart: (req, res) => {
    res.render("products/productCart")
  },
  /* offer: async (req, res) => {
     let ofertas =  await db.Product.findAll({
      include: [{ association: "images" }],
      where: {
        price: {[db.Sequelize.Op.lte]: 5000 },
      },

      order : [
        ['price', 'DESC']
    ]
    })

    console.log(ofertas)

    .then(ofertas =>{
      res.render("/", {ofertas : ofertas} )

    })

    .catch(function (error) {
      res.send(error);
    })
  }
 */};

module.exports = mainController;
