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
const Images = db.Image

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
  search: function (req, res, next) {
    let productToFind = req.query.product;
    Products.findAll({
      include: [{ association: "images" }],
      where: {
        [Op.or]: {
          product_name: { [Op.like]: '%' + productToFind + '%' },
          description: { [Op.like]: '%' + productToFind + '%' }
        }
      }
    })
      .then(function (products) {
        res.render("products/productlist", { products });
      })
      .catch(function (error) {
        res.send(error);
      })
  },
  list: (req, res) => {
    Products.findAll(
      { include: [{ association: "images" }] }
    )
      .then(products => {
        res.render('products/productlist', { products })
      })

  },

  productDetail: (req, res) => {
    Products.findByPk(req.params.id,
      { include: ["colors", "images", "sizes", "category", "line"] })
      .then(prendas => {
        /*   res.json(prendas.images[1].name) */
        res.render("products/productDetail", { prendas });
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
  store: async (req, res) => {
    let productToCreate = await Products.create({
      product_code: req.body.code,
      line_id: req.body.line,
      product_name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category_id: req.body.category,
    })

    let imagesTocreate = req.files.map(file => {
      return {
        name: file.filename,
        product_id: productToCreate.id,
      }
    })
    await Images.bulkCreate(imagesTocreate);
    await productToCreate.setColors(req.body.color);
    await productToCreate.setSizes(req.body.size)


    res.redirect("/products/create");


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

  update: async (req, res) => {
    await Products.update({
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

    let productFound = await Products.findByPk(req.params.id);
    if (productFound) {
      await productFound.setColors(req.body.color);
      await productFound.setSizes(req.body.size);
    }
    res.redirect("/products/list");

  },

  destroy: async (req, res) => {
    let productToDelete = await Products.findByPk(req.params.id);
    await productToDelete.setColors([]);
    await productToDelete.setSizes([]);
    await productToDelete.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect("/products/list");

  }
};

module.exports = productsController;
