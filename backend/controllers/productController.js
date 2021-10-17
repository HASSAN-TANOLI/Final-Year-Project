exports.getproducts = (req, res, next) => {
  res.status(200).json({

    success: true,
    message: 'this route will show all the product in database'
  })
}