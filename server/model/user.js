var mongoose = require('mongoose');
 
var userSchema = mongoose.Schema({
    fbId : Number,
    name : String,
    email : String,
}, {timestamps : true});
 
var User = mongoose.model('User', userSchema);

module.exports = User
 