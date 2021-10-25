const express = require('express');
const router= express.Router();

const {registerUser, loginUser, logoutUser} = require('../controllers/customerController');

router.route('/registeruser').post(registerUser);
router.route('/loginuser').post(loginUser);
router.route('/logoutuser').get(logoutUser);


module.exports = router; 