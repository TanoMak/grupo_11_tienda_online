const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../Views/index.html'))
  } );
  
router.get('/login', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../Views/login.html'))
    } );
  
router.get('/carrito', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../Views/productCart.html'))
    } );
  
router.get('/detalleDeProducto', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../Views/productDetail.html'))
    } );
  
router.get('/registro', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../Views/register.html'))
    } );


module.exports = {
        router,
        default: router,
    }
