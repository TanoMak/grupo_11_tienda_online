const path = require("path");
const productsController = {
	register: (req, res) => {
    res.render("products/productRegister");
  },

  list: (req, res) =>{
    res.render ("products/productList")
  }
	
}

module.exports = productsController;