const axios = require('axios')

class GitHubController {

     //SEARCH USER ------------------------>>>
    static searchUser(req, res) {
        let name = req.params.name

        axios.get(`https://api.github.com/users/${name}?`)
        .then((user) => {
            res.status(200).json({
                message: 'User Data',
                user: user.data
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            }) 
        });
    }

     //LIST REPOSITORIES ------------------------>>>
    static listRepo(req, res) {

        axios.get(`https://api.github.com/users/wahyudisetiaji/repos`)
        .then((repo) => {
            res.status(200).json({
                message: 'List Repo',
                user: repo.data
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            }) 
        });

    }

     //CREATE REPOSITORIES ------------------------>>>
    static createRepo(req, res) {
        // toke github: 48e3132c0bf0a3ed6558e13b8e9525bf9f07fb96

        axios.post(`https://api.github.com/user/repos?access_token=${process.env.TOKEN_GIT}`)
        .then(() => {
            res.status(200).json({
                message: 'Create repo success'
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    }


}

module.exports = GitHubController