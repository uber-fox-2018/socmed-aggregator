const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idFacebook : String,
  name : String,
  email : String
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;