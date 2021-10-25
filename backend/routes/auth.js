const express = require('express');
const router= express.Router();

const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword} = require('../controllers/customerController');

router.route('/registeruser').post(registerUser);
router.route('/loginuser').post(loginUser);
router.route('/logoutuser').get(logoutUser);
router.route('/userpassword/forgot').post(forgotPassword);
router.route('/userpassword/reset/:token').put(resetPassword);


module.exports = router; 