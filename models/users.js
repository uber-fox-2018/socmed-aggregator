const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    userName : 'string',
    facebookId : 'string',
    email : 'string'
})

module.exports = mongoose.model('User',schema)