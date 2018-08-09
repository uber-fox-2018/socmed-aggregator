const mongoose = require('mongoose')
const objectId = require('mongoose').objectID

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    id_fb: Number
})

var User = mongoose.model('User', userSchema)

module.exports = User