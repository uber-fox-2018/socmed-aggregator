const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')
require('dotenv').config()

class Controller {
    static loginFb(req, res){
        let urlUserInfo = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.fbToken}`
        axios.get(urlUserInfo)
        .then(response => {
            var salt = bcrypt.genSaltSync(8)
            var hash = bcrypt.hashSync(response.data.id, salt)
            User.findOne({email: response.data.email})
            .then(user => {
                if(!user){
                    User.create({
                        name: response.data.name,
                        email: response.data.email,
                        password: hash
                    })
                    .then(user => {
                        res.status(200).json({
                            msg: 'Sucessfully registered!',
                            user,
                            token: req.body.fbToken
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            msg: 'Register failed',
                            err
                        })
                    })
                } else {
                    let compare = bcrypt.compareSync(response.data.id, user.password)  
                    if(compare){
                        jwt.sign({id: user._id, name: user.name}, process.env.secretKey, (err, token) => {
                            if(err) res.status(401).json('Failed to sign token')
                            res.status(200).json({
                                msg: 'Successfully login!',
                                token,
                                name: user.name
                            })
                        })
                    }  else {
                        res.status(401).json('Login failed, please check your email/password!')
                    }
                }
            })
            .catch(err => {
                res.status(400).json({
                    msg: 'login with fb error'
                })
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'fb error'
            })
        })
    }

}

module.exports = Controller
