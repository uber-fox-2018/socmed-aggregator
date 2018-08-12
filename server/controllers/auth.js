var jwt = require('jsonwebtoken');
// const User = require('../models')
// const User = model.Users
// const User = require('../models/user')


class Auth{
    static AuthUser(req,res,next){
        var decoded = jwt.verify(req.headers.token, process.env.secret_key, function(err,decoded){
            // console.log(decoded);
            
            if(decoded){
                next()
            }
            else{
                res
                .status(401)
                .json({
                    message: "failed authentication"
                })
            }
        });
    }
}


module.exports = Auth