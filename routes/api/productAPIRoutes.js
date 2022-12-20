const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

router.get('/list', productsAPIController.list);
router.get('/detail/:id', productsAPIController.productDetail);

module.exports = router