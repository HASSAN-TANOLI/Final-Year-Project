const express = require('express');

const router = express.Router();
const { getproducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productcontroller');
const {isAuthenticatedVendor, authorizeRoles } = require('../middlewares/auth');


router.route('/products').get(isAuthenticatedVendor, authorizeRoles('vendor'),  getproducts);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedVendor, newProduct);

router.route('/admin/product/:id').put(isAuthenticatedVendor, updateProduct);

router.route('/admin/product/:id').delete(isAuthenticatedVendor, deleteProduct);




module.exports = router;
