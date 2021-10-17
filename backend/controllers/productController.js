const product = require('../models/product')

//Create new Product => /api/v1/product/new

exports.newProduct = async (req,res, next) => {
  
  const product = await product.create(req.body);
 
  res.status(201).json({
    success: true,
    product
  })
}



exports.getproducts = (req, res, next) => {
  res.status(200).json({

    success: true,
    message: 'this route will show all the product in database'
  })
}