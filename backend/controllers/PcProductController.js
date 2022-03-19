const Pcproduct = require('../models/PcProduct')
const ErrorHandler= require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')


 //Create new PcProduct => /api/v1/admin/pc-product/new

exports.newPcProduct = catchAsyncErrors (async (req,res, next) => {
  
 
  const pcproduct = await Pcproduct.create(req.body);
 
  res.status(201).json({
    success: true,
    pcproduct
  })
})

// Get all Pcproduct => /api/v1/pc-product
exports.getPcProduct =catchAsyncErrors (async (req, res, next) => {

  const resPerPage = 4; //Showing 4 result per page 
  const productCount = await Pcproduct.countDocuments();
  const apiFeatures = new APIFeatures(Pcproduct.find(), req.query)
                                      .search()
                                      .filter()
                                      .pagination(resPerPage)

  const pcpproduct = await apiFeatures.query;
  res.status(200).json({

    success: true,
    count: pcpproduct.length,
    productCount,
    pcpproduct
  })
})

// Get single product detail => /api/v1/pc-product/:id

exports.getSinglePcProduct = catchAsyncErrors (async (req, res, next) => {
  const pcproduct = await Pcproduct.findById(req.params.id);

  if (!pcproduct)
  {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    pcproduct
  })
})
// Update Product => /api/v1/admin/pc-product/:id

exports.updatePcProduct = catchAsyncErrors (async (req, res, next) => {
  let pcproduct = await Pcproduct.findById(req.params.id);

  if (!pcproduct)
  {
    return next(new ErrorHandler('Product not found', 404));
  }

  pcproduct = await Pcproduct.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    pcproduct
  })
})

//Delete Product => /api/v1/admin/pc-product/:id 

exports.deletePcProduct = catchAsyncErrors (async (req, res, next) => {
  const pcproduct = await Pcproduct.findById(req.params.id);

  if (!pcproduct)
  {
    return next(new ErrorHandler('Product not found', 404));
  }

  await pcproduct.remove();

  res.status(200).json({
    success: true,
    message: 'product is deleted'
  })

})
