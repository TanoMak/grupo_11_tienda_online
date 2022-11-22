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
    Products.create({
      product_code: req.body.code,
      line_id: req.body.line,
      product_name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category_id: req.body.category,
      image_id: req.file.filename
    })
      .then((producto) => {
        producto.setColors(req.body.color)
        producto.setSizes(req.body.size)

        res.redirect("/products/create");
      })

  },

  edit: (req, res) => {
    let productSelected = Products.findByPk(req.params.id);
    let listadoCategorias = Categories.findAll()
    let listadoColores = Colors.findAll()
    let listadoLineas = Lines.findAll()
    let listadoTalles = Sizes.findAll()

    Promise.all([productSelected, listadoCategorias, listadoColores, listadoLineas, listadoTalles])
      .then(function ([Product, Category, Color, Line, Size]) {
        res.render("products/productUpdateForm", {
          Products: Product,
          Categories: Category,
          Colors: Color,
          Lines: Line,
          Sizes: Size
        })
      })

  },

  update: (req, res) => {
    Products.update({
      product_code: req.body.code,
      line_id: req.body.line,
      product_name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category_id: req.body.category,
    },
      {
        where: {
          id: req.params.id
        }
      })

      .then(() => {
        res.redirect("/products/list")
      })

      .catch((error) => {
        res.send(error)
      })
  },

  destroy: (req, res) => {
    Products.findByPk()
    Products.destroy({
      where: { id: req.params.id },
      force: true
    })

      .then(() => {
        res.redirect("/products/list")
      })

      .catch((error) => {
        res.send(error)
      })

  }
};

module.exports = productsController;
