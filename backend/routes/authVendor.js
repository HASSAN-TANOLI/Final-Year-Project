const express = require('express');
const router = express.Router();

const {registerVendor, loginVendor, logoutVendor, forgotPassword, getVendorProfile, resetPassword} = require('../controllers/vendorController');

const {isAuthenticatedVendor} = require('../middlewares/auth');

router.route('/registervendor').post(registerVendor);
router.route('/loginvendor').post(loginVendor);
router.route('/logoutvendor').get(logoutVendor);
router.route('/vendorpassword/forgot').post(forgotPassword);
router.route('/vendorpassword/reset/:token').put(resetPassword);

router.route('/vendor').get(isAuthenticatedVendor, getVendorProfile);


module.exports = router;