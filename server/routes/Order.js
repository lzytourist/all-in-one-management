const express = require('express')
const Order = require('../models/Order')
const authenticate = require('./Auth')

const router = express.Router()

/**
 * Get Orders
 *
 * @param limit, skip
 * @returns Array | On success returns Order objects Array otherwise Error Message
 */
router.get('/', authenticate, async (req, res) => {
  const limit = parseInt(req.query.limit)
  const skip = parseInt(req.query.skip)

  Order.find().skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.send({
        success: false,
        message: 'Something went wrong'
      })
    } else {
      res.send({
        success: true,
        orders: docs
      })
    }
  })
})

/**
 * Add Order
 *
 * @params Request body with order details
 * @returns Object | Successful or unsuccessful message
 */
router.post('/', authenticate, (req, res) => {
  const order = new Order({
    ...req.body
  })

  order.save((err, doc) => {
    if (err) {
      const keys = [...Object.keys(err.errors)]
      const errors = []
      keys.forEach(key => {
        errors.push(err.errors[key]['message'])
      })

      res.send({
        errors,
        success: false,
        message: err._message
      })
    } else {
      res.send({
        success: true,
        message: 'Order added successfully',
        order: doc
      })
    }
  })
})

/**
 * Get Single Order
 */
router.get('/:id', authenticate, async (req, res) => {
  Order.findOne({_id: req.params.id}).then(response => {
    res.send({
      success: true,
      order: response
    })
  }).catch(err => {
    res.send({
      success: false,
      error: err
    })
  })
})

/**
 * Update Order
 *
 * @requires Order body
 * @returns Object | Order data and success message
 */
router.put('/:id', authenticate, async (req, res) => {
  const order = Order.findOneAndUpdate({_id: req.params.id}, {
    ...req.body
  }, {new: true}, ((err, doc) => {
    if (err) {
      res.send({
        success: false,
        message: 'Could not update order'
      })
    } else {
      res.send({
        success: true,
        message: 'Order updated',
        order: doc
      })
    }
  }))
})

/**
 * Delete single order
 */
router.delete('/:id', authenticate, ((req, res) => {
  Order.findOneAndDelete({_id: req.params.id}, null, (err => {
    if (err) {
      res.send({
        success: false,
        message: 'Could not delete order'
      })
    } else {
      res.send({
        success: true,
        message: 'Order deleted'
      })
    }
  }))
}))

module.exports = router