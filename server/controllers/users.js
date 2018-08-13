const User = require('../models/user')

module.exports = {
    
    userSignUp: (req,res) => {

        User
            .create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role: req.body.role
            })

            .then(user => {
                res.status(200).json({
                    msg:'create success',
                    user
                })
            })

            .catch(err => {
                res.status(500).json({
                    msg:'error'
                })
            })

    },
    userLogin: (req,res)=>{
        User
            .findOne({
                id:req.params.id
            })
            .then(data => {
                var token = jwt.sign({id:data.id,username:data.username}, 'secret') 
                res.status(201).json({
                    msg:'login succes',
                    data,
                    token
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'error'
                })
            })
    },
    loginFb : (req,res) => {
    
        let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=`
        axios.get(url_user_info)
        .then(userFb => {
            
            User.findOne({
                email: userFb.data.email
            })
                .then(user => { 
                    if (user == null) {
                        User.create({
                            name: userFb.data.name,
                            email: userFb.data.email,
                            password: `${userFb.data.id}`
                        })
                        .then((newUser) => {
                           
                            let token = jwt.sign( { id: newUser._id, email: newUser.email },'muhammad-riza' )
                            res.status(201).json({
                                message: `successfully registered`,
                                token
                            })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                message: err.message
                            })
                        })
                    }else {
                        let token = jwt.sign( { id: user._id, email: user.email },'muhammad-riza' )
                        res.status(200).json({
                            message: `login successfully`,
                            token
                        })
                    }
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                })
        })
    

}
}