const express = require('express');
const router = express.Router();
const {getAllProductsStatic,getAllProducts} = require('./../controllers/product.controller')

router.route('/').get(getAllProducts);
router.get('/static',getAllProductsStatic);


module.exports=router;