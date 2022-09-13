const path = require("path");
const productsController = {
	register: (req, res) => {
    res.render("productRegister");
  },

  list: (req, res) =>{
    res.render ("productList")
  }
	
}

module.exports = productsController;