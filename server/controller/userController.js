const axios = require('axios');
const User = require('../models/user.js')
var jwt = require('jsonwebtoken');

class Controller{

    static loginFb(req,res){
        // console.log(req.body.headers)
        let token = req.body.headers.tokenFb
        let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        axios.get(url)
        .then(data=>{
            console.log(data.data)
            User.findOne({
                email : data.data.email
            })
            .then(mail=>{
                if(!mail){
                    User.create({
                        name : data.data.name,
                        email : data.data.email
                    })
                    .then(dataUser=>{
                        var token = jwt.sign({ name: dataUser.name,email : dataUser.email }, 'easy');
                        res.json({dataUser ,token})
                    })
                }else{
                    var token = jwt.sign({ name: mail.name,email : mail.email }, 'easy');
                    res.json({mail,token})
                }
            })
            .catch(err=>{
                res.json(err)
            })
        })
    }

    static authentication(req,res,next){
        var decoded = jwt.verify(req.headers.token,'easy')
        if(decoded){
            next()
        }else{
            res.status(400).json(err)
        }
    }

}
module.exports = Controller