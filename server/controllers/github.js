const request = require('request')

const getMe = (req,res) => {
    var options = {
        url: 'https://api.github.com/users/wisnugautama',
        headers: {
          'User-Agent': 'request'
        }
    };

    request(options, function callback(error,response,body){
        // console.log('=========', body);
        
        let info = JSON.parse(body)
        if (error) {
            res.status(400).json({
                message: error.message
            })
        }else {
            res.status(200).json({
                message: `my data`,
                data: info
            })
        }
    })
}

const getUser = (req,res) => {
    let name = req.query.q
    console.log(name);
    
    var options = {
        url: `https://api.github.com/search/users?q=${name}`,
        headers: {
          'User-Agent': 'request'
        }
    };

    request(options, function callback(error,response,body){
        
        let info = JSON.parse(body)
        if (error) {
            res.status(400).json({
                message: error.message
            })
        }else {
            res.status(200).json({
                message: `user data`,
                data: info
            })
        }
    })
}

const getUserRepo = (req,res) => {
    let user = req.body.user
    var options = {
        url: `https://api.github.com/users/${user}/repos`,
        headers: {
          'User-Agent': 'request'
        }
    };

    request(options, function callback(error,response,body){
        
        let info = JSON.parse(body)
        if (error) {
            res.status(400).json({
                message: error.message
            })
        }else {
            res.status(200).json({
                message: `repos data`,
                data: info
            })
        }
    })
}

const createRepo = (req,res) => {
    var options = {
        uri: `https://api.github.com/user/repos`,
        headers: {
          'User-Agent': 'request',
          'Authorization': 'token da8208483740a18e55d03600baac81f9050a4221',
        },
        method: 'POST',
        json: { name: req.body.name }
    };

    request(options, function callback(error,response,body){
        // let info = JSON.parse(body)
        if (error) {
            res.status(400).json({
                message: error.message
            })
        }else {
            res.status(200).json({
                message: `successfully create a repo`,
                data: body
            })
        }
    })
}

module.exports = {
    getMe,
    getUser,
    getUserRepo,
    createRepo
}