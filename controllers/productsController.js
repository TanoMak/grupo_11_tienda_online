const path = require("path");
const productsController = {
	register: (req, res) => {
    res.render("productRegister");
  }
	
}

module.exports = productsController;