const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const UserSchema = new Schema({
  fbId: String,
  name: String,
  email: String
})

const user = mongoose.model('User', UserSchema)

module.exports = user