const request = require('request')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


module.exports = {

  signinFacebook: (req, res) => {
    const { accessToken, userID } = req.body
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}` //disimpan di server
    axios.get(url_user_info)
      .then(result => {

        User.findOne({ email: result.data.email})
          .then(data => {
            if (data) {
              const token = jwt.sign({
                userID: data.userID,
                name: data.name
              }, process.env.JWT_SECRET_KEY)
              res.status(200).json({
                message: "Success login",
                token: token
              })
            } else {
              User.create({
                userID: userID,
                name: result.data.name,
                email: result.data.email
              })
              .then(() => {
                const token = jwt.sign({
                  userID: userID,
                  name: result.data.name
                }, process.env.JWT_SECRET_KEY)
                res.status(200).json({
                  message: "Login success",
                  token: token
                })
              })
            }
          })
      })
      .catch(err => {
        console.log(err.message)
      })
  },

  listRepository: (req, res) => {
    const options = {
      url: `https://api.github.com/users/arisupriatna14/repos?access_token=${process.env.ACCESS_TOKEN}`,
      headers: {
        'User-Agent': 'request/getallmyrepository',
        Accept: 'application/vnd.github.nightshade-preview+json'
      }
    }

    function callback(error, response, body) {
      if (error) {
        res.status(500).json({
          error: error
        })
      } else {
        let myRepository =  JSON.parse(body)
        res.status(200).json({
          message: "Success get all my repository",
          myRepository
        })
      }
    }

    request.get(options, callback)
  },

  search: (req, res) => {
    const options = {
      url: `https://api.github.com/search/repositories?q=${req.query.repoName}&?access_token=${process.env.ACCESS_TOKEN}`,
      headers: {
        'User-Agent': 'request/searchrepository',
        Accept: 'application/vnd.github.mercy-preview+json'
      }
    }

    function callback(error, response, body) {
      if (error) {
        res.status(500).json({
          error: error
        })
      } else {
        const repositories = JSON.parse(body)
        res.status(200).json({
          message: "Success get repository public",
          repositories
        })
      }
    }

    request.get(options, callback)
  },

  postRepository: (req, res) => {
    const options = {
      url: `https://api.github.com/user/repos?access_token=${process.env.ACCESS_TOKEN}`,
      headers: {
        'User-Agent': 'Github project ari',
        'content-type': 'application/json',
        Accept: 'application/vnd.github.nightshade-preview+json'
      },
      method: 'POST',
      json: {
        name: req.body.name
      }
    }

    function callback(error, response, body) {
      if (error) {
        res.status(500).json({
          error: error
        })
      } else {
        const newRepository = body
        res.status(200).json({
          message: "Success create new repository",
          data: newRepository
        })
      }
    }

    request(options, callback)
  }
}