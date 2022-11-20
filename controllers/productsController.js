const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Se requieren las tablas  //
const Products = db.Product
const Categories = db.Category
const Colors = db.Color
const Lines = db.Line
const Sizes = db.Size
const ColorProduct = db.color_product

// Revisa si la conexíon con la base de datos es corercta //
sequelize.authenticate()
  .then(function (errors) {
    if (errors != undefined) {
      console.log(errors)
    } else {
      console.log("Acceso exitoso a la base de datos ")
    }
  });

const productsController = {
  list: (req, res) => {
    Products.findAll()
      .then(products => {
        res.render('products/productlist', { products })
      })

  },

  productDetail: (req, res) => {
    Products.findByPk(req.params.id)
      .then(prenda => {
        res.render("products/productDetail", { prenda });
      })
  },

  add: (req, res) => {
    let listadoCategorias = Categories.findAll()
    let listadoColores = Colors.findAll()
    let listadoLineas = Lines.findAll()
    let listadoTalles = Sizes.findAll()

    Promise.all([listadoCategorias, listadoColores, listadoLineas, listadoTalles])
      .then(function ([Category, Color, Line, Size]) {
        res.render("products/productRegister", {
          Categories: Category,
          Colors: Color,
          Lines: Line,
          Sizes: Size
        })
      })
  },
  store: (req, res) => {
    const newProduct = Products.create({
      product_code: req.body.code,
      line_id: req.body.line,
      product_name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      color_id: req.body.color,
      size_id: req.body.size,
      category_id: req.body.category,
      image_id: req.file.filename
    })

    // Hay que hacer el regsitro en la tabla color_product //
 /*    const newColorSelection = ColorProduct.create({
      product_id : newProduct.id,
      color_id : req.body.color
     })
 */
   
    res.redirect("/products/create");
  },

  edit: (req, res) => {
    const data = findAll();
    const prendaEncontrada = data.find(function (prenda) {
      return prenda.id == req.params.id

    })
    res.render("products/productUpdateForm", { prenda: prendaEncontrada })
  },

  update: (req, res) => {
    const data = findAll()
    const prendaEncontrada = data.find(function (prenda) {
      return prenda.id == req.params.id
    })

    prendaEncontrada.name = req.body.name;
    prendaEncontrada.description = req.body.description;
    prendaEncontrada.price = req.body.price;
    prendaEncontrada.line = req.body.line;
    prendaEncontrada.category = req.body.category;
    prendaEncontrada.color = req.body.color;
    prendaEncontrada.size = req.body.size;
    prendaEncontrada.offerlist = req.body.offerlist;
    prendaEncontrada.image = req.file.filename

    writeFile(data)

    res.redirect("/products/list")

  },

  destroy: (req, res) => {
    const data = findAll();
    const prendaEncontrada = data.findIndex(function (prenda) {
      return prenda.id == req.params.id



    })

    data.splice(prendaEncontrada, 1)

    writeFile(data)

    res.redirect("/products/list")

  }

};

module.exports = productsController;
