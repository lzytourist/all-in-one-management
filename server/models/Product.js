const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Product name is required']},
  price: {type: Number, required: [true, 'Product price is required']},
  publication: {type: String}
})

module.exports = mongoose.model('Product', ProductSchema)