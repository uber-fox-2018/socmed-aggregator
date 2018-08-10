const User = require('../model/user');
const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
  auth : function (req,res,next) {
    let token = req.headers.token
    if (token) {
      try {
        let decoded = jwt.verify(token, process.env.secret_key)
        User.findOne({
          fbId : decoded.id
        })
          .then (dataUser => {
            if (dataUser) {
              next()
            } else {
              res.status(401)
              .json ({message : "user not authenticated"})
            }
          })
          .catch (err => {
            res.status(500)
            .json ({message : "internal server error"})
          })
      } catch(err) {
        res.status(400)
           .json ({message : "token invalid"})
      }
    } else {
      res.status(401)
      .json ({message : "token not found"})
    }
  }
}