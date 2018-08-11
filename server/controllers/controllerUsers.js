let User = require('../models/modelUser')
const axios = require('axios')
const jwt = require('jsonwebtoken')

module.exports = {
  registerUser: (req, res) => {
    let newMember = req.body
    User.create(newMember)
      .then(user => {
        res.status(200).json({
          message: 'Success To register new User',
          data: user
        })
      })
      .catch(err => {
        res.status(401).json({
          message: 'Failed to register new User',
          err: err.message
        })
      })
  },

  loginWithFb: (req, res) => {
    let accessToken = req.body.authRes.accessToken
    let url_user_fb = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    axios.get(url_user_fb)
      .then(response => {
        let idFb = response.data.id
        User.findOne({ idFb: idFb })
          .then(user => {
            let token = jwt.sign({ role: user.role }, 'githab_secret_key')
            res.status(200).json({
              message: 'Success',
              data: response.data,
              token: token
            })
          })
          .catch(err => {

          })
      })
      .catch(err => {
        // console.log('=========== ERORR ============');
        // console.log(err);
        res.status(400).json({
          message: 'error',
          err: err
        })
      })
  },

  loginUser: (req, res) => {
    let member = {
      username: req.body.name,
    }
    let query = { name: member.username }
    User.findOne(query)
      .then(user => {
        // console.log(user);
        res.status(200).json({
          message: 'User FInd',
          data: user
        })
        // res.send(user)
      })
      .catch(err => {
        // res.send(err)
        res.status(500).json({
          message: 'User not Found',
          err: err.message
        })
      })
  },

  searchUser: (req, res) => {
    let username = req.body.username
    axios({
      method: 'get',
      url: `https://api.github.com/search/users?q=${username}`,
      headers: {
        'User-Agent': 'apiGithab',
        Accept: 'application/vnd.github.nightshade-preview+json'
      },
    })
      .then(response => {
        res.status(201).json({
          message: 'Success',
          data: response.data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Fail',
          err: err
        })
      })
  }
}