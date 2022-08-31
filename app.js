const express = require('express');
const path = require('path');
const app = express();
const indexRoutes = require('../grupo_11_tienda_online/routes/index');


app.use(express.static(path.join(__dirname,'./public')));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(indexRoutes.default);


app.listen(3030,() => { console.log('Servidor corriendo, puerto 3030');});