const express = require('express');
const { join } = require('path');
const path = require('path');
const app = express();
const indexRoutes = require('../grupo_11_tienda_online/routes/index');

app.use(express.static(path.join(__dirname,'./public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(indexRoutes.default);


app.listen(3030,() => { console.log('Servidor corriendo, puerto 3030');});