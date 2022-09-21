const fs = require("fs");
const path = require("path");

function findAll() {
  const jsonData = fs.readFileSync(
    path.join(__dirname, "../data/products.json")
  );
  const data = JSON.parse(jsonData);
  return data;
};



const productsController = {
  list: (req, res) => {
    const data = findAll();
    res.render("products/productList", { products: data });
  },
  productDetail: (req, res) => {
    res.render("products/productDetail")
  },
  register: (req, res) => {
    res.render("products/productRegister");
  },
	
}

module.exports = productsController;