const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: String
},{
    timestamps: true
})

const Users = mongoose.model('User',UserSchema)

module.exports = Users