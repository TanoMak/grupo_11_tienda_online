const express = require('express');
const resolve = require('path');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname,'./Public')));
app.use(express.static(path.join(__dirname,'./Views')));

app.listen(3030,() => { console.log('Servidor corriendo, puerto 3030');});

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname,'./views/index.html'))
} );

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/login.html'))
  } );

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/productCart.html'))
  } );

app.get('/detalleDeProducto', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/productDetail.html'))
  } );

app.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/register.html'))
  } );

