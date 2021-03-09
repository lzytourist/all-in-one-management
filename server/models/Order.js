const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  customer_name: {type: String},
  customer_phone: {type: String, required: [true, 'Phone number is required']},
  customer_address: {type: String, required: [true, 'Customer address is required']},
  items: {type: Array, required: [true, 'Need to have some items']},
  order_date: {type: String, default: new Date().toISOString().substr(0, 10)},
  delivery_date: {type: String, default: new Date().toISOString().substr(0, 10)},
  delivered: {type: Boolean, default: false},
  buying_price: {type: Number, required: [true, 'Buying price is required']},
  selling_price: {type: Number, required: [true, 'Selling price is required']}
})

module.exports = mongoose.model('Order', OrderSchema)