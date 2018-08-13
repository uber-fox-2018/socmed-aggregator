var jwt = require('jsonwebtoken');

var isAdmin = function (req, res, next) {
    var token = req.headers.token
    console.log(token);
    if(token){
        let decoded = jwt.verify(token, 'secret-key')
        if(decoded.role === 'admin'){
            next()
        }else{
            res.status(401).json({
                msg: 'lu ga bisa masuk soalnya bukan admin'
            })
        }
        
    }else{
        console.log('masuk');
        
        res.status(400).json({
            msg: 'login failed'
        })
    }
  }

module.exports = isAdmin