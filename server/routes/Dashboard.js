const express = require('express')
const authenticate = require('./Auth')
const Order = require('../models/Order')
const Product = require('../models/Product')

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  const orderDeliveredCount = await Order.countDocuments({delivered: true})
  const orderPendingCount = await Order.countDocuments({delivered: false})
  const productCount = await Product.countDocuments()

  const selling_price = {delivered: 0, pending: 0}
  selling_price.delivered = await Order.aggregate([
    {$match: {delivered: true}},
    {$group: {_id: null, selling_price: {$sum: "$selling_price"}}}
  ])
  selling_price.delivered = selling_price.delivered[0]
  if (selling_price.delivered) selling_price.delivered = selling_price.delivered.selling_price
  else selling_price.delivered = 0

  selling_price.pending = await Order.aggregate([
    {$match: {delivered: false}},
    {$group: {_id: null, selling_price: {$sum: "$selling_price"}}}
  ])
  selling_price.pending = selling_price.pending[0]
  if (selling_price.pending) selling_price.pending = selling_price.pending.selling_price
  else selling_price.pending = 0

  const buying_price = {delivered: 0, pending: 0}
  buying_price.delivered = await Order.aggregate([
    {$match: {delivered: true}},
    {$group: {_id: null, buying_price: {$sum: "$buying_price"}}}
  ])
  buying_price.delivered = buying_price.delivered[0]
  if (buying_price.delivered) buying_price.delivered = buying_price.delivered.buying_price
  else buying_price.delivered = 0

  buying_price.pending = await Order.aggregate([
    {$match: {delivered: false}},
    {$group: {_id: null, buying_price: {$sum: "$buying_price"}}}
  ])
  buying_price.pending = buying_price.pending[0]
  if (buying_price.pending) buying_price.pending = buying_price.pending.buying_price
  else buying_price.pending = 0

  res.send({
    success: true,
    orderDeliveredCount,
    orderPendingCount,
    productCount,
    selling_price,
    buying_price
  })
})

module.exports = router