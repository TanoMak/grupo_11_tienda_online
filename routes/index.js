const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/index.html'))
  } );
  
router.get('/login', (req, res) => {
      res.sendFile(path.resolve(__dirname,'./views/login.html'))
    } );
  
router.get('/carrito', (req, res) => {
      res.sendFile(path.resolve(__dirname,'./views/productCart.html'))
    } );
  
router.get('/detalleDeProducto', (req, res) => {
      res.sendFile(path.resolve(__dirname,'./views/productDetail.html'))
    } );
  
router.get('/registro', (req, res) => {
      res.sendFile(path.resolve(__dirname,'./views/register.html'))
    } );


module.exports = {
        router,
        default: router,
    }