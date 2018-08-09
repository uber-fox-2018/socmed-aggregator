const isLogin = (req,res,next) => {
    var token = localStorage.getItem('token')
    if (token) {
        next()
    }else {
        res.status(400).json({
            msg: `anda belum register/login`
        })
    }
}


module.exports = {
    isLogin
}