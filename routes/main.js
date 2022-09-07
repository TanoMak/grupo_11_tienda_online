const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require("../controllers/mainController");

router.get("/",mainController.home);

router.get('/login', mainController.login);

router.get('/registro', mainController.register);


router.get('/carrito', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../views/productCart.html'))
    } );
  
router.get('/detalleDeProducto', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../views/productDetail.html'))
    } );
  


module.exports = {
        router,
        default: router,
    }
