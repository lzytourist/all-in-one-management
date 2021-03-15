const mongoose = require('mongoose')

const DB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = DB