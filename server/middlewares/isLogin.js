var isLogin = (req, res, next) => {
    let token = req.headers.token
    if(token){
        next()
    }else{
        res.status(400).json({
            msg: 'User must be Log In'
        })
    }
}

module.exports = isLogin