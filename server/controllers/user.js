const User = require('../model/user')
const jwt = require('jsonwebtoken')
const request = require('request')

const signUp = (req, res) => {
    const { username, password, role } = req.body
    User.create({
        username: username,
        password: password,
        role: role
    })
        .then((data) => {
            res.status(201).json({
                message: `Successfully create a user`,
                data: data
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
}

const signIn = (req, res) => {
    let authResponse = req.body
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`

    console.log(authResponse);


    let options = {
        url: url_user_info,
        headers: {
            'User-Agent': 'request'
        }
    }

    request(options, function callback(error, response, body) {
        let info = JSON.parse(body)
        console.log(info);

        if (error) {
            res.status(400).json({
                message: error.message
            })
        } else {
            User.findOne({
                email: info.email
            })
                .then((data_user) => {
                    if (data_user == null) {
                        User.create({
                            name: info.name,
                            email: info.email,
                            id_fb: info.id
                        })
                        .then(() => {
                            res.status(201).json({
                                message: `${info.name} successfully registered`
                            })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                message: err.message
                            })
                        })
                    } else {
                        console.log(data_user);

                        var token = jwt.sign({ id: data_user.id, name: data_user.name }, 'rahasia');
                        console.log(token);
                        
                        // localStorage.setItem('token', token)
                        res.status(200).json({
                            message: `ini datanya`,
                            token
                        })
                    }
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                })
        }
    })

}

module.exports = {
    signUp,
    signIn
}