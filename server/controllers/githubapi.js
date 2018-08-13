
require('dotenv').config()
var request = require('request');
const jwt = require('jsonwebtoken')

const getUser = (req,res) => {
    
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
      if(err) res.status(401).json({msg:"is not user"})

      var options = {
            url: `https://api.github.com/users/${decoded.name}/repos?access_token=${process.env.gitAcces_Token}`,
            headers: {
              'User-Agent': 'request',
              Accept : 'application/vnd.github.nightshade-preview+json'
            }
          };
          
          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              res.status(200).json({info})
            }else{
              res.status(400).json({info:"you don't have repositories"})
            }
          }
          
          request.get(options, callback);
    
    })
}

const createRepo = (req, res) => {
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
      if(err) res.status(401).json({msg:"is not user"})
        let obj = {}
            obj['name'] = req.body.name
        var options = {
            url: `https://api.github.com/user/repos?access_token=${process.env.gitAcces_Token}`,
            headers: {
              'User-Agent': 'request',
              Accept : 'application/vnd.github.nightshade-preview+json'
            },
            json : obj
          };
          function callback(error, response, body) {
            if (!error) {
            //   var info = JSON.parse(body);
              res.status(200).json(body)
            }
          }
          
          request.post(options, callback);
    })
}

const search = (req,res) => {
    
    let repository = req.query.repository
    let language = req.query.language
    console.log(req.query)
    var options = {
        url: `https://api.github.com/search/repositories?q=${repository}+language:${language}&page=1&per_page=100&sort=stars&order=desc&access_token=${process.env.gitAcces_Token}`,
        headers: {
          'User-Agent': 'request',
          Accept : 'application/vnd.github.mercy-preview+json'
        },
       
      };

      function callback(error, response, body) {
        if (!error) {
          var info = JSON.parse(body);
          res.status(200).json(info)
        }
      }
       
      request.get(options, callback);
}

module.exports = {
    getUser,
    createRepo,
    search
}


