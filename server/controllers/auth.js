const User = require('../models/user')
const FB = require('fb')
var jwt = require('jsonwebtoken');
require('dotenv').config()


const add = function(req,res){
    User
    .create({
        name: req.body.name,
        email: req.body.email,
        password : req.body.password,
    })
    .then(function(user){
        res
        .status(200)
        .json({
            msg : "successfully create user",
            user : user 
        })
    })
    .catch(function(err){
        res
            .status(400)
            .json({
                msg : err.message
            })
    })
}

const login = function(req,res){
    console.log("login server", req.body)
    let email = req.body.email
    let password = req.body.password

    User
    .findOne({
        email : email
    })
    .then(function(user){
        if(user){
            let hash = user.password
            user
            .comparePassword(password, function(err, isMatch){  
                if(isMatch){
                    var token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.tokenSecretKey);
                    console.log("dari server token :", token )
                    res
                        .status(200)
                        .json({
                            msg : "login successfully",
                            token : token,
                        })
                    }else{
                        res
                            .status(401)
                            .json({
                                msg : "wrong password"
                            })
                    }

            })
        }else{
            res
                .status(400)
                .json("email unregister")
        }
    })
    .catch(function(err){
        res
        .status(401)
        .json({
            msg : err.message
        })
    })
    console.log(email, password)
}

loginFacebook = function(req,res){
    let tokenFb = req.body.accessToken
    console.log("<=======================================",tokenFb)
    FB.api('me', {fields:['id', 'name', 'email'], 
            access_token:tokenFb},
            function(resFb){
                console.log(resFb.email)
                let email = resFb.email
                User
                .findOne({email:email})
                .then(function(user){
                    console.log(user)
                    if(user){
                        console.log("ada user nya", user)
                        var token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.tokenSecretKey);
        
                        console.log("dari server token (ada user):", token )
                        res
                            .status(200)
                            .json(token) 
                    }else{
                        let name = resFb.name.split(' ')
                        let password = name[0]+'hacktiv8'
                        console.log("password====>", password)
                        User
                        .create({
                            name:resFb.name,
                            email:resFb.email,
                            password:password,
                        })
                        .then(function(user){
                            var token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.tokenSecretKey);
                            console.log("dari server token (user baru):", token )
                            res
                                .status(200)
                                .json(token)
                        })
                        .catch(function(err){
                            res
                               .status(400)
                               .json(err)
                        })
                    }
                })
                .catch(function(err){
                    res
                        .status(400)
                        .json({
                            msg : err.message
                        })
                })
            }) 
}



module.exports = {
    add,
    login,
    loginFacebook,
}