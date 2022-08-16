const express = require('express');
const resolve = require('path');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname,'./Public')));

app.listen(3030,() => { console.log('Servidor corriendo, puerto 3030');});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'./views/index.html'))
} );