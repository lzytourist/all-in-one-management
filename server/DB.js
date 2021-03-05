const mongoose = require('mongoose')

const DB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    console.log('DB Connection Stablished')
  } catch (err) {
    console.log(err)
  }
}

module.exports = DB