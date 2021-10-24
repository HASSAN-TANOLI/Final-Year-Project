const express = require('express');
const router= express.Router();

const {registerUser, loginUser, logoutVendor} = require('../controllers/customerController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logoutvendor').get(logoutVendor);


module.exports = router; 