const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const DB = require('./DB')

process.env.NODE_ENV = 'development';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

DB().then(() => {})

const authRoutes = require('./routes/UserAuthentication')
const users = require('./routes/User')
const orders = require('./routes/Order')
const products = require('./routes/Product')
const dashboard = require('./routes/Dashboard')

app.use('/api/auth', authRoutes)
app.use('/api/users', users)
app.use('/api/orders', orders)
app.use('/api/products', products)
app.use('/api/dashboard', dashboard)

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static Folder
    app.use(express.static(__dirname + '/public'))

    // Handle SPA
    app.get(/.*/, ((req, res) => res.sendFile(__dirname + '/public/index.html')))
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})