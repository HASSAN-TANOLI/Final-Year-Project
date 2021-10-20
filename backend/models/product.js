const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

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

    url: {
      type: String,
      required: true
    },

  }
],

  category: {
    type: String,
    required: [true, 'Please enter category for this product'],
    enum: {
      values: [
        'Electronics',
        'Laptops',
        'Mobiles',
        'Computers',
        'Accessories',
        'MotherBoards',
        'Processors',
        'GraphicCards',
        'Ram',
        'HardDisks',
        'SSD',
        'KeyBoards',
        'Mouse',
        'Headphones'
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

    createdAt: {
      type: Date,
      default: Date.now 
    }

})

module.exports = mongoose.model('product', productSchema);