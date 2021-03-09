const express = require('express')
const Product = require('../models/Product')
const authenticate = require('./Auth')

const router = express.Router()

/**
 * Get Products
 *
 * @param limit, skip
 * @returns Array | On success returns Product objects Array otherwise Error Message
 */
router.get('/', authenticate, async (req, res) => {
  const limit = parseInt(req.query.limit)
  const skip = parseInt(req.query.skip)

  Product.find().skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.send({
        success: false,
        message: 'Something went wrong'
      })
    } else {
      res.send({
        success: true,
        products: docs
      })
    }
  })
})

/**
 * Add Product
 *
 * @params Request body with product details
 * @returns Object | Successful or unsuccessful message
 */
router.post('/', authenticate, (req, res) => {
  const product = new Product({
    ...req.body
  })

  product.save((err, doc) => {
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
        message: 'Product added successfully',
        product: doc
      })
    }
  })
})

/**
 * Get Single Product
 */
router.get('/:id', authenticate, async (req, res) => {
  Product.findOne({_id: req.params.id}).then(response => {
    res.send({
      success: true,
      product: response
    })
  }).catch(err => {
    res.send({
      success: false,
      error: err
    })
  })
})

/**
 * Update Product
 *
 * @requires Product body
 * @returns Object | Product data and success message
 */
router.put('/:id', authenticate, async (req, res) => {
  const product = Product.findOneAndUpdate({_id: req.params.id}, {
    ...req.body
  }, {new: true}, ((err, doc) => {
    if (err) {
      res.send({
        success: false,
        message: 'Could not update product'
      })
    } else {
      res.send({
        success: true,
        message: 'Product updated',
        product: doc
      })
    }
  }))
})

/**
 * Delete single product
 */
router.delete('/:id', authenticate, ((req, res) => {
  Product.findOneAndDelete({_id: req.params.id}, null, (err => {
    if (err) {
      res.send({
        success: false,
        message: 'Could not delete product'
      })
    } else {
      res.send({
        success: true,
        message: 'Product deleted'
      })
    }
  }))
}))

module.exports = router