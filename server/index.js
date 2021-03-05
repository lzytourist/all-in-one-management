const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

process.env.NODE_ENV = 'development';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Routes
// const orders = require('./routes/api/Order')
// app.use('/api/orders', orders)

const users = require('./routes/User')
app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})