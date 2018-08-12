const request = require('request');
const keys = require('../config/keys')

function search (name,find,res){
    var options = {
        url:  `https://api.github.com/search/${find}?q=${name}`,
        headers: {
          'User-Agent': 'khodhi'          
        }
      };

      function callback(error, response, body) {
        if (response.statusCode == 200) {
          console.log('SUCCESS, SERVER')
          var info = JSON.parse(body);
          res.status(200).send(info)    
        } else {
          console.log('FAIL SERVER')
          res.status(500).send(error)
        }
      }
      request(options, callback);
}
function list (name,res){
    var options = {
        url:  `https://api.github.com/users/${name}/repos`,
        headers: {
          'User-Agent': 'khodhi',
          'Authorization' : 'token ' + keys.github.token
        }
      };
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          res.status(200).send(info)    
        }
      }
      request(options, callback);
}

function myList (res){
    var options = {
        url:  `https://api.github.com/user/repos`,
        headers: {
          'User-Agent': 'khodhi',
          'Authorization' : 'token ' + keys.github.token
        }
      };
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          res.status(200).send(info)    
        }
      }
      request(options, callback);
}

function create (req,res){
    
    var options = {
        method : 'POST',
        json : true,
        body : {name : req.body.name, description : req.body.description},
        url:  `https://api.github.com/user/repos`,
        headers: {
          'User-Agent': 'khodhi',
          'Authorization' : 'token ' + keys.github.token,
          'Content-Type' : 'application/json',
          'Accept' : 'application/vnd.github.mercy-preview+json'
        }
      };
   
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {          
          res.status(201).json(body)    
        }    
      }
      request(options, callback);
}

module.exports = {search,list,myList,create}