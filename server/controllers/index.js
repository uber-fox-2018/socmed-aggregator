const request = require('request');
const rp = require('request-promise');
const jwt = require('jsonwebtoken');

function options (url){
    return {
        uri : url,
        qs : {
            access_token : `${process.env.ACCESS_TOKEN}` // -> uri + '?access_token=xxxxx%20xxxxx'
        }, 
        headers:{
            'User-Agent' : 'request',
            Accept : "application/vnd.github.nightshade-preview+json",
            'Content-Type': 'application/json',
            Authorization: `token ${process.env.ACCESS_TOKEN}`
        },
        json: true
    }
}


module.exports = {
    home :(req, res) =>{
        res.status(200).json({
            msg: "WELCOME!!!"
        })
    },

    listUserRepos : (req , res) =>{
        rp(options("https://api.github.com/user/repos"))
            .then(repos=>{
                res.status(200).json({
                    msg : `User has ${repos.length} repos`, 
                    repos
                })
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }, 
    
    searchUsers : (req , res) =>{
        const name = req.query.name
        rp(options(`https://api.github.com/search/users?q=${name}`))
            .then(users =>{
                res.status(200).json({
                    msg : `There are ${users.total_count} users in total`,
                    users
                })
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }, 

    newRepo : (req , res) =>{
        const options = {
            method : "POST",
            uri : 'https://api.github.com/user/repos',
            qs : {
                access_token : `${process.env.ACCESS_TOKEN}` // -> uri + '?access_token=xxxxx%20xxxxx'
            }, 
            body : {
                name : req.body.repoName
            },
            headers:{
                'User-Agent' : 'request',
                Accept : "application/vnd.github.nightshade-preview+json",
                'Content-Type': 'application/json',
                Authorization: `token ${process.env.ACCESS_TOKEN}`
            },
            json: true
        }
        rp(options)
            .then(body =>{
                res.status(200).json({
                    msg : `${body.name} repo is successfully created!`,
                    body
                })
            })
            .catch(err=>{
                res.status(422).json(err.error.errors[0].message)
                console.log(err.error.errors[0].message)
            })
    }
}