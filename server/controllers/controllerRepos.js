const axios = require('axios')

module.exports = {
  createRepos: (req, res) => {
    axios({
      method: 'post',
      url: `https://api.github.com/user/repos?access_token=${process.env.access_token_github}`,
      headers: {
        'User-Agent': 'apiGithab',
        'Content-Type': 'application/json', // if want to change raw JSON to req.body
        Accept: 'application/vnd.github.nightshade-preview+json'
      },
      data: {
        name: req.body.reposName
      },
    })
      .then(response => {
        res.status(200).json({
          message: 'Success to create repository',
          data: response.data
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Fail to create repository',
          err: err
        })
      })
  }
}