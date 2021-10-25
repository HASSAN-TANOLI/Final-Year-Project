const express = require('express');
const router = express.Router();

const {registerVendor, loginVendor, logoutVendor} = require('../controllers/vendorController');

router.route('/registervendor').post(registerVendor);
router.route('/loginvendor').post(loginVendor);
router.route('/logoutvendor').get(logoutVendor);

module.exports = router;