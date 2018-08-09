const User = require('../models/user')

class Controller {
    static register(req, res){
        var {fbId, name, email} = req.body
        User.find({fbId})
        .then(result => {
            if(result.length === 0){
                User.create({
                    fbId, name, email
                })
                .then(newUser => {
                    res.status(200).json(newUser)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            }
        })
    }
    
}

module.exports = Controller
