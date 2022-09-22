const fs = require("fs");
const path = require("path");

function findAll() {
  const jsonData = fs.readFileSync(
    path.join(__dirname, "../data/products.json")
  );
  const data = JSON.parse(jsonData);
  return data;
}

function writeFile(data) {
  const dataString = JSON.stringify(data, null, 4);
  fs.writeFileSync(path.join(__dirname, "../data/products.json"), dataString);
}

const productsController = {
  list: (req, res) => {
    const data = findAll();
    res.render("products/productList", { products: data });
  },
  productDetail: (req, res) => {
    const data = findAll();
    const prendaEncontrada = data.find(function (prenda) {
      return prenda.id == req.params.id;
    });

    res.render("products/productDetail", { prenda: prendaEncontrada });
  },
  create: (req, res) => {
    res.render("products/productRegister");
  },
  store: (req, res) => {
    const data = findAll();

    const newProduct = {
      id: data.length+1,
      name: req.body.name,
      description: req.body.description,
      price:Number(req.body.price),
      line: req.body.line,
      category: req.body.category,
      color: req.body.color,
      image: req.file.filename,
    };

    data.push(newProduct);

    console.log(newProduct)

    writeFile(data);

    res.redirect("/products/list");
  },
};

module.exports = productsController;
