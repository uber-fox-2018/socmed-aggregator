const User = require('../model/user');
const FB = require('fb');
const jwt = require('jsonwebtoken')

module.exports = {
  login : function (req,res) {
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.fbtoken}`
    //tinggal di get pake axios
    axios.get(url_user_info)
      .then (resFB => {
        //find wether the response email already in database or not
        var query  = User.where({ email: resFB.email })
        query.findOne(function (err, user) {
          if (err) {
            res.status(500)
                .json({message : "internal server error"})
          } else {
            if (user == null) {
              //no user found with above email, register the user
              let newUser = {
                fbId : resFB.id,
                name : resFB.name,
                email : resFB.email,
              }
              User.create(newUser, function (err, book) {
                if (err) {
                  res.status(500)
                      .json({message : "internal server error"})
                } else {
                  let token = jwt.sign({id : resFB.id, name : resFB.name, email : resFB.email}, process.env.secret_key)
                  res.status(200)
                      .json({message : "successfully login/register" , token : token})
                }
              })

            } else {
              let token = jwt.sign({id : resFB.id, name : resFB.name, email : resFB.email}, process.env.secret_key)
              console.log(token)
              res.status(200)
                  .json({message : "successfully login/register" , token : token})
            }
          }
        })
      })

    //atau pake fb npm
    // FB.setAccessToken(req.body.fbtoken)
    // FB.api('me', { fields: ['id', 'name', 'email'], access_token: req.body.token }, function (resFB) {
    //   //find wether the response email already in database or not
    //   var query  = User.where({ email: resFB.email })
    //   query.findOne(function (err, user) {
    //     if (err) {
    //       res.status(500)
    //           .json({message : "internal server error"})
    //     } else {
    //       if (user == null) {
    //         //no user found with above email, register the user
    //         let newUser = {
    //           fbId : resFB.id,
    //           name : resFB.name,
    //           email : resFB.email,
    //         }
    //         User.create(newUser, function (err, book) {
    //           if (err) {
    //             res.status(500)
    //                 .json({message : "internal server error"})
    //           } else {
    //             let token = jwt.sign({id : resFB.id, name : resFB.name, email : resFB.email}, process.env.secret_key)
    //             res.status(200)
    //                 .json({message : "successfully login/register" , token : token})
    //           }
    //         })

    //       } else {
    //         let token = jwt.sign({id : resFB.id, name : resFB.name, email : resFB.email}, process.env.secret_key)
    //         console.log(token)
    //         res.status(200)
    //             .json({message : "successfully login/register" , token : token})
    //       }
    //     }
    //   })
    // })
  }
}