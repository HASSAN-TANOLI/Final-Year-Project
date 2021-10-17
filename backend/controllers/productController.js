const Product = require('../models/product')

//Create new Product => /api/v1/admin/product/new

exports.newProduct = async (req,res, next) => {
  
  const product = await Product.create(req.body);
 
  res.status(201).json({
    success: true,
    product
  })
}


// Get all products => /api/v1/products
exports.getproducts = async (req, res, next) => {

  const products = await Product.find();
  res.status(200).json({

    success: true,
    count: products.length,
    products
  })
}

// Get single product detail => /api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
  {
    return res.status(404).json({
      success: false,
      message: 'product not found'
    })
  }

  res.status(200).json({
    success: true,
    product
  })
}

// Update Product => /api/v1/admin/product/:id

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product)
  {
    return res.status(404).json({
      success: false,
      message: 'product not found'
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    product
  })
}

//Delte Product => /api/v1/admin/product/:id 

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
  {
    return res.status(404).json({
      success: false,
      message: 'product not found'
    })
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'product is deleted'
  })

}