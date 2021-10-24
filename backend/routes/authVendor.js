const express = require('express');
const router = express.Router();

const {registerVendor, loginVendor} = require('../controllers/vendorController');

router.route('/registervendor').post(registerVendor);
router.route('/loginvendor').post(loginVendor);

module.exports = router;