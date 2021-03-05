const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    req.user = jwt.verify(token, process.env.APP_SECRET_KEY)
    next()
  } catch (err) {
    res.send({
      success: false,
      message: 'Unauthenticated'
    })
  }
}

module.exports = authenticate