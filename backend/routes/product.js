const express = require('express');

const router = express.Router();
const { getproducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productcontroller');


router.route('/products').get(getproducts);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(newProduct);

router.route('/admin/product/:id').put(updateProduct);

router.route('/admin/product/:id').delete(deleteProduct);




module.exports = router;
