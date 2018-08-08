const request = require('request');
const axios  = require('axios')

const options = (url)=>{
    return {
        url,
        headers:{
            'User-Agent' : 'request',
            Accept : "application/vnd.github.nightshade-preview+json",
            'Content-Type': 'application/json',

        },
    }
}

module.exports = {
    index : (req, res) => {
        res.status(200).json({message:'HI THERE!'})
    },

    listUserRepos : (req, res) => {
        let username = req.params.username
        request.get(options(`https://api.github.com/users/${username}/repos`), function callback(error, response, body) {
            res.status(200).json({
                msg:"success",
                data:JSON.parse(body)
            })
        })
    },

    searchUser : (req,res) => {
        const name = req.params.username
        request.get(options(`https://api.github.com/search/users?q=${name}`), function callback(error, response, body) {
            res.status(200).json({
                msg:"success",
                data:JSON.parse(body)
            })
        })       
    },
    
    createRepo : (req, res) =>{
        let token = req.params.token
        let repoName = req.params.repoName
        axios.post(`https://api.github.com/user/repos?access_token=${token}`,{
            name : repoName
        }, {headers:{
            'User-Agent' : 'request',
            Accept : "application/vnd.github.nightshade-preview+json",
            'Content-Type': 'application/json',
        }})
        .then(response=>{
            res.status(201).json({
                data: response.data
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}