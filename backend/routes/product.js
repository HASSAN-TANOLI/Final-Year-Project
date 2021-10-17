const express = require('express');

const router = express.Router();
const { getproducts } = require('../controllers/productcontroller');


router.route('/products').get(getproducts);

module.exports = router;
