const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Se requieren las tablas  //
const Products = db.Product
const Categories = db.Category
const Colors = db.Color
const Lines = db.Line
const Sizes = db.Size
const Images = db.Image

const productsAPIController = {
    

    list: async (req, res) => {
        try {
            let products = await Products.findAll(
                { include: [{ association: "images"}] 
              });              
            
            let newData = products.map(product => {
                return {
                    id: product.id,
                    name: product.product_name,
                    description: product.description,
                    category: product.category_id,
                    image: product.images,
                    
                }
            })  

              let response = {
                      meta: {
                      status: 200,
                      total: products.length,
                      url: 'api/products/list'
                  },
                  data: newData
              };
              res.send(response); 
            
        } catch (error) {
            console.log(error);            
        };
    },

    productDetail: async (req, res) => {
         try {
            let product = await Products.findByPk(req.params.id,
                { include: ["colors", "images", "sizes", "category", "line"] 
              });
            console.log("El producto ", product);  
            let response = {
                  meta: {
                      status: 200,
                      total: product.length,
                      url: 'api/products/detail/:id'
                  },
                  data: product
              };
              res.send(response);
            
        } catch (error) {
            console.log(error) ;           
        };
      },

      prodCategories: async (req, res) => {
        try {
           let categories = await Categories.findAll();
           console.log("El producto ", categories);  
           let response = {
                 meta: {
                     status: 200,
                     total: categories.length,
                     url: 'api/products/categories'
                 },
                 data: categories
             };
             res.send(response);
           
       } catch (error) {
           console.log(error) ;           
       };
     },
   

};
module.exports = productsAPIController;
 