const express = require('express');

const router = express.Router();

const { newPcProduct, getPcProduct, getSinglePcProduct, updatePcProduct, deletePcProduct } = require('../controllers/PcProductController');

router.route('/pc-product/new').post(newPcProduct);
router.route('/pc-product').get(getPcProduct);
router.route('/pc-product/:id').get(getSinglePcProduct);
router.route('/pc-product/:id').put(updatePcProduct);
router.route('/pc-product/:id').delete(deletePcProduct);

module.exports = router;