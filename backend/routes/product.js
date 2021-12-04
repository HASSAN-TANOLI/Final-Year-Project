const express = require('express');

const router = express.Router();
const { getproducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productcontroller');
const {isAuthenticatedVendor, authorizeRoles, isAuthenticatedUser } = require('../middlewares/auth');


router.route('/products').get(getproducts);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedVendor, authorizeRoles('vendor'), newProduct);

router.route('/admin/product/:id').put(isAuthenticatedVendor, authorizeRoles('vendor'), updateProduct);

router.route('/admin/product/:id').delete(isAuthenticatedVendor, authorizeRoles('vendor'), deleteProduct);




module.exports = router;
