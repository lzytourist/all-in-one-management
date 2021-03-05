const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const DB = require('../DB')

const router = express.Router()

DB().then(() => {})

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit)
  const skip = parseInt(req.query.skip)
  console.log(req.query)
  User.find().skip(skip).limit(limit).exec(((err, res1) => {
    if (err) {
      res.send({
        success: false,
        message: 'Something went wrong',
        err
      })
    } else {
      res.send({
        success: true,
        users: res1
      })
    }
  }))
})

router.get('/get/:id', async (req, res) => {
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
 * @returns Object
 *
 * Returns success message on success or error message on error
 */
router.post('/', async (req, res) => {
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
              res.send({
                status: false,
                message: err1
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

router.put('/:id', async (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {...req.body}, null, ((err, doc) => {
    if (err) {
      res.send({
        success: false,
        message: err
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