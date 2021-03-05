const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = require('./Auth')

const router = express.Router()

router.post('/', authenticate, (req, res) => {
  res.send({
    user: req.user
  })
})

/**
 * Login
 *
 * @requires username and password in request body
 * @return success message and token || error message
 */
router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({email: email})
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({name: user.name, email: email}, process.env.APP_SECRET_KEY, {expiresIn: '1h'})

      res.send({
        success: true,
        message: 'Login successful',
        token
      })
    } else {
      res.send({
        success: false,
        message: 'Wrong credentials'
      })
    }


  } else {
    res.send({
      success: false,
      message: 'Wrong credentials'
    })
  }
})

module.exports = router