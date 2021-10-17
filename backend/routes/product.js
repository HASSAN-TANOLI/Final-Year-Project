const express = require('express');

const router = express.Router();
const { getproducts, newProduct } = require('../controllers/productcontroller');


router.route('/products').get(getproducts);

router.route('/product/new').post(newProduct);

module.exports = router;
