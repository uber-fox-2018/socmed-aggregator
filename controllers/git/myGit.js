const request = require('request');
const Users = require('../../models/users')
const jwt = require('jsonwebtoken')                       
let requestHelper = require('../../helper/requestHelper')

const create = (req, res) => {
    requestHelper.create(req,res)
}

const login = (req,res) => {
    let fbToken = req.body.token    
        var options = {
            url:  `https://graph.facebook.com/me?fields=id,name,email&access_token=${fbToken}`
          };
          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              var fbInfo = JSON.parse(body);
              console.log(fbInfo)
                Users.findOne({email : fbInfo.email})
                .then(data =>{
                    if(data == null){
                        Users.create({
                            userName : fbInfo.name,
                            facebookId:fbInfo.id,
                            email : fbInfo.email
                        })
                        .then((user)=>{
                                
                                let tokenKu = jwt.sign({id : user.id},'secretKey')
                
                            console.log(tokenKu)
                        })
                        .catch(err => console.log(err))
                    }

                    else{
                        Users.findOne({email : fbInfo.email})
                        .then(user =>{
                            let tokenKu = jwt.sign({id : user.id},'secretKey')
                            console.log(tokenKu)
                        })
                        .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
                
            }
          }
          request(options, callback);
  
}

module.exports = {create,login}