const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const authenticate = require('./Auth')

const router = express.Router()

/**
 * Get All Users
 *
 * Also supports query for limiting and skipping documents
 * @returns Array of Documents
 */
router.get('/', authenticate, (req, res) => {
  const limit = parseInt(req.query.limit)
  const skip = parseInt(req.query.skip)

  User.find().skip(skip).limit(limit).exec(((err, res1) => {
    if (err) {
      res.send({
        success: false,
        message: 'Something went wrong',
      })
    } else {
      res.send({
        success: true,
        users: res1
      })
    }
  }))
})

/**
 * Get Single User
 *
 * @return Object
 */
router.get('/:id', authenticate, async (req, res) => {
  const user = await User.findOne({_id: req.params.id})
  if (user) {
    res.json({
      success: true,
      user: user
    }).send()
  } else {
    res.json({
      success: false,
      message: 'Something went wrong'
    }).send()
  }
})

/**
 * Add User
 * @param req
 * @param res
 * @returns Object | Returns success message on success or error message on error
 */
router.post('/', authenticate, async (req, res) => {
  if (req.body.password !== '') {
    bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
      if (err) {
        res.send({
          message: err,
          status: false
        })
      } else {
        const findUser = await User.findOne({email: req.body.email})

        if (findUser) {
          res.send({
            success: false,
            message: 'Email already used'
          })
        } else {

          const user = new User({
            ...req.body,
            password: hashedPass
          })

          user.save(((err1, doc) => {
            if (err1) {
              const keys = [...Object.keys(err.errors)]
              const errors = []
              keys.forEach(key => {
                errors.push(err.errors[key]['message'])
              })

              res.send({
                status: false,
                message: err1._message,
                errors
              })
            } else {
              res.send({
                status: true,
                message: 'User Created',
                user: doc
              })
            }
          }))
        }
      }
    })
  } else {
    res.send({
      success: false,
      message: 'Password is required'
    })
  }
})

/**
 * Update an User
 *
 * @param request body
 * @returns Object | On success returns User document | On error returns error message
 */
router.put('/:id', authenticate, async (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {...req.body}, null, ((err, doc) => {
    if (err) {
      res.send({
        success: false,
        message: err._message
      })
    } else {
      res.send({
        success: true,
        user: doc
      })
    }
  }))
})

module.exports = router