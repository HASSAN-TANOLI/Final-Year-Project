const mongoose = require('mongoose');


const pcproductSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Please enter Product Name'],
    trim: true,
    maxLength: [200, 'product name cannot exceed 200 characters']
  },

  price: {
    type: Number,
    required: [true, 'Please enter Product Price'],
    maxLength: [5, 'product price cannot exceed 5 characters'],
    default: 0.0
  },

  description: {
    type: String,
    required: [true, 'Please enter Product Description']
  },

  ratings: {
    type: Number,
    default: 0
  },

  images: [
  {
    // public_id: {
    //   type: String,
    //   required: true
    // },

    // url: {
    //   type: String,
    //   required: true
    // },

  }
],

  category: {
    type: String,
    required: [true, 'Please enter category for this product'],
    enum: {
      values: [
        'Case',
        'Motherboard',
        'Cpu',
        'Gpu',
        'Ram',
        'Storage Device',
        'System Cooling',
        'Psu',
        'Mouse',
        'Keyboard',
        'Monitor',
        'Operating System'
      ],
      message: 'Please select the following catogorize'
    }
  },

  // vendor: {
  //   type: String,
  //   required: [true, 'Please enter product vendor']
  // },

    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [50, 'product cannot exceed 5 characters'],
        default: 0
    },

    numOfReviews: {
      type: Number,
      default: 0
    },

    reviews: [
      {
        name: {
          type: String,
          required: true
        },

        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }
    ],

    // vendor: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Vendor',
    //   required: true
    // },

    createdAt: {
      type: Date,
      default: Date.now 
    }

})

//Now mongoose.model is used to compiled schema into model and can further use for CRUD operation
module.exports = mongoose.model('pcproduct', pcproductSchema);