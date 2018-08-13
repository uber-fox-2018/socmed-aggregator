const User = require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = {
    insert: (req, res) => {
        const { name, email, password, role } = req.body
        var hash = bcrypt.hashSync(password, salt);
        User.create({
            name: name,
            email: email,
            password: hash,
            role: role
        })
            .then((user) => {
                res.status(201).json({
                    msg: 'data inserted',
                    user
                })
            })
            .catch((err) => {
                res.status(500).json({
                    msg: 'inser failed',
                    msg: err.message
                })
            });
    },

    signIn: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user === null) {
                    res.status(401).json({
                        msg: 'username/password wrong',
                        user
                    })
                } else {
                    let login = bcrypt.compareSync(req.body.password, user.password)
                    if (login) {
                        var token = jwt.sign({
                            id: user.id,
                            email: user.email,
                            role: user.role
                        }, 'secret-key')
                        
                        res.status(201).json({
                            msg: 'login succes',
                            token
                        })
                    } else {
                        res.status(401).json({
                            msg: 'username/password wrong',
                            data
                        })
                    }
                }
            })
            .catch((err) => {
                res.send(err)
            });
    },

    signInFb: (req, res) => {
        let fb = req.body
        let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${fb.fb.accessToken}`
        axios.get(url_user_info)
            .then((result) => {
                User.findOne({ email: result.data.email })
                    .then((user) => {
                        if (user === null) {
                            res.status(401).json({
                                msg: 'username/password wrong',
                                user
                            })
                        } else {
                            var token = jwt.sign({
                                id: user.id,
                                email: user.email,
                                role: user.role
                            }, 'secret-key')

                            res.status(201).json({
                                msg: 'login succes',
                                token
                            })
                        }
                    })
                    .catch((err) => {
                        res.status(500).json({
                            msg: err.message,
        
                        })
                    });
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message,

                })
            });
    },

    

};
