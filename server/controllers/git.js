const request = require('request')
require('dotenv').config()

module.exports = {
  getUserRepo : (req,res) => {
    request(
      {
        url: `https://api.github.com/users/${req.query.user}/repos?access_token=${process.env.access_token}`,
        headers: {
          'User-Agent' : 'uber-fox',
          'Accept': 'application/vnd.github.mercy-preview+json'
        }
      },
      function (error, response, body) {
        if (error) {
          res.status(500)
          .json({message : "error get data"})
        }
        res.status(201)
          .json({message : "successfully get user repo", data : JSON.parse(body)})
      }
    )
  },
  searchTopic : (req,res) => {
    request(
      {
        url: `https://api.github.com/search/topics?q=${req.query.topic}+is:featured&access_token=${process.env.access_token}`,
        headers: {
          'User-Agent' : 'uber-fox',
          'Accept': 'application/vnd.github.mercy-preview+json'
        }
      },
      function (error, response, body) {
        if (error) {
          res.status(500)
          .json({message : "error get data"})
        }
        res.status(201)
          .json({message : "successfully search topic", data : JSON.parse(body)})
      }
    )
  },
  createRepo : (req,res) => {
    request.post(
      {
        // method: 'POST',
        uri: `https://api.github.com/user/repos?access_token=${process.env.access_token}`,
        json: {
          "name" : req.body.name
        },
        headers: {
          'User-Agent' : 'uber-fox',
          'Accept': 'application/vnd.github.mercy-preview+json',
          'content-type': 'application/json'
        }
      },
      function (error, response, body) {
        if (error) {
          res.status(500)
          .json({message : "error post data"})
        }
        res.status(201)
          .json({message : "successfully create repo", data : body})
      }
    )
  }
}