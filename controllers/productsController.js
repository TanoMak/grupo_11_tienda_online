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

/*   offerlist: (req, res) => {
    const data = findAll();
    const listadoOfertas = data.filter(function(prenda){
      return prenda.offerlist == true
    })

    res.render("index", { productos: listadoOfertas });

  }, */
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
      size: req.body.size,
      offerlist: Boolean(req.body.offerlist),
      image: req.file.filename,
    };

    data.push(newProduct);

    console.log(newProduct)

    writeFile(data);

    res.redirect("/products/create");
  },

  edit: (req, res) =>{
    const data = findAll();
    const prendaEncontrada = data.find(function(prenda){
      return prenda.id ==req.params.id

    })
    res.render ("products/productUpdateForm", {prenda : prendaEncontrada})
  },

  update: (req, res) =>{
    const data = findAll()
    const prendaEncontrada = data.find(function(prenda){
        return prenda.id ==req.params.id
    })

    prendaEncontrada.name = req.body.name;
    prendaEncontrada.description = req.body.description;
    prendaEncontrada.price = req.body.price;
    prendaEncontrada.line = req.body.line;
    prendaEncontrada.category = req.body.category;
    prendaEncontrada.color = req.body.color;
    prendaEncontrada.size = req.body.size;
    prendaEncontrada.offerlist= req.body.offerlist;
    prendaEncontrada.image = req.file.filename

    writeFile(data)

 res.redirect("/products/list")

},

destroy: (req, res) =>{
  const data = findAll();
  const prendaEncontrada = data.findIndex(function(prenda){
      return prenda.id == req.params.id
      


  })

  data.splice(prendaEncontrada, 1)

  writeFile(data)

  res.redirect("/products/list")

}

};

module.exports = productsController;
