var request = require('request');

class Controller{

    static getRepo(req,res){
        // console.log('tes')
        request({
            url :`https://api.github.com/users/${process.env.user}/repos`,
            headers : {
                'User-Agent' : 'request',
                'Accept' : 'application/vnd.github.mercy-preview+json',
                'Authorization' : `token ${process.env.token}`
            },
        },  function(error,response,body){
            let data = JSON.parse(body)
            res.status(200).json(data)
        })
    }

    static createRepo(req,res){
        request.post({
            url : `https://api.github.com/user/repos`,
            headers : {
                'User-Agent' : 'request',
                'Accept' : 'application/vnd.github.mercy-preview+json',
                'Authorization' : `token ${process.env.token}`,
                'content-type' : 'application/json' 
            },
            json : {
                'name' : req.body.name
            }
        },function(error,response,body){
            if(error){
                res.json(err)
            }else{

                res.json(body)
            }
        })
    }

    static searchRepo(req,res){
        request({
            url : `https://api.github.com/search/users?q=${req.query.keyword}`,
            headers : {
                'User-Agent' : 'request',
                'Accept' : 'application/vnd.github.mercy-preview+json',
                'Authorization' : `token ${process.env.token}`,
            }
        },function(error,respone,body){
            if(error){
                res.json(error)
            }else{
                let data = JSON.parse(body)
                res.json(data)
            }
        })
    }

    
}

module.exports = Controller