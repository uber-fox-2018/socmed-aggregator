var jwt = require('jsonwebtoken');

const isAdmin = (req,res,next) => {
    let token = req.headers.token
    console.log(token);
    
    try {
        var decoded = jwt.verify(token, 'rahasia');
        if (decoded.role !== 'admin') {
            res.status(400).json({
                msg: `akses only for admin`
            })
        }else {
            next()
        }
      } catch(err) {
        // err
      }
}

module.exports = {
    isAdmin
}
