const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userID: {
    type: Number
  },
  name: {
    type: String
  },
  email: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)