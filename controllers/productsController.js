const { validationResult } = require("express-validator");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { async } = require("validate.js");


// Se requieren las tablas  //
const Products = db.Product
const Categories = db.Category
const Colors = db.Color
const Lines = db.Line
const Sizes = db.Size
const Images = db.Image
const Users = db.User

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
  search: async function (req, res, next) {
    let productToFind = req.query.product;
    let users = req.session.usuarioLogueado

    let products = await Products.findAll({
      include: [{ all: true }],
      where: {
        [Op.or]: {
          product_name: { [Op.like]: '%' + productToFind + '%' },
          description: { [Op.like]: '%' + productToFind + '%' },
          id: { [Op.like]: '%' + productToFind + '%' }
        }
      }
    })
    res.render("products/productlist", { products, users });
  },
  list: async (req, res) => {
    let products = await Products.findAll({ include: [{ association: "images" }] })
    let users = req.session.usuarioLogueado

    res.render('products/productlist', {
      products: products,
      users: users
    })
  },

  productDetail: async (req, res) => {
    let users = req.session.usuarioLogueado
    let prendas = await Products.findByPk(req.params.id,
      { include: ["colors", "images", "sizes", "category", "line"] })

   

    res.render("products/productDetail", { prendas, users });

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
    try {
      let categorias = await Categories.findAll()
      let colores = await Colors.findAll()
      let lineas = await Lines.findAll()
      let talles = await Sizes.findAll()

      const resultValidation = validationResult(req);


      if (resultValidation.errors.length > 0) {
        return res.render("products/productRegister", {
          errors: resultValidation.mapped(),
          oldData: req.body,
          Categories: categorias,
          Colors: colores,
          Lines: lineas,
          Sizes: talles
        });
      } else {
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
        res.redirect("/products/create",);
      }
    } catch (error) {
      console.log(error);
    };



  },


  edit: (req, res) => {
    let productSelected = Products.findByPk(req.params.id,
      { include: ["colors", "images", "sizes", "category", "line"] });
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
    try {
      let Product = Products.findByPk(req.params.id,
        { include: ["colors", "images", "sizes", "category", "line"] });
      let categorias = await Categories.findAll()
      let colores = await Colors.findAll()
      let lineas = await Lines.findAll()
      let talles = await Sizes.findAll()

      const resultValidation = validationResult(req);


      if (resultValidation.errors.length > 0) {
        return res.render("products/productUpdateForm", {
          errors: resultValidation.mapped(),
          oldData: req.body,
          Products: Product,
          Categories: categorias,
          Colors: colores,
          Lines: lineas,
          Sizes: talles
        });
      } else {
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
          let imagesTocreate = req.files.map(file => {
            return {
              name: file.filename,
              product_id: productFound.id,
            }
          })
          await Images.bulkCreate(imagesTocreate);
        }
        res.redirect("/products/list");
      }

    } catch (error) {
      console.log(error);
    }


  },

  destroy: async (req, res) => {
    try {
      let productToDelete = await Products.findByPk(req.params.id);
      await productToDelete.setColors([]);
      await productToDelete.setSizes([]);
      await productToDelete.destroy({
        where: {
          id: req.params.id
        }
      })
      res.redirect("/products/list");
    } catch (error) {
      console.log(error);
    }

  }
};

module.exports = productsController;
