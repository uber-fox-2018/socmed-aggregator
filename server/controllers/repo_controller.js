const request = require('request')
const axios = require('axios');

function getOwnRepo(req, res) {
        let options = {
          url: 'https://api.github.com/user/repos?access_token=540398dbda95253a9fb85e1f1dcfb3f1dfc5459c',
          headers: {
            'User-Agent': 'testing',
            'Accept': 'application/vnd.github.mercy-preview+json'
        },
        //   methods : GET
        };

       function callback(error, response, body) {
        if(!error){
            var info = JSON.parse(body);
            res.status(200).json({
                msg: 'masuk',
                count: info.length,
                info
            })
        }else{
            res.status(500).json({
                msg: 'error',
                msg: error.message
            })
        }

       }

       request(options, callback);

}

function searchRepo(req,res) {
  
    console.log(req.body.name);
    
    var options = {
        methods: "get",
        url: `https://api.github.com/users/${req.body.name}`,
        headers: {
          'User-Agent': 'request',
          'Accept': 'application/vnd.github.mercy-preview+json'
        }
      }
       
      function callback(error, response, body) {
        if(!error){
            var info = JSON.parse(body);
            res.status(200).json({
                msg: 'masuk',
                count: info.length,
                info
            })
        }else{
            res.status(500).json({
                msg: 'error',
                msg: error.message
            })
        }
      }
       
      request.get(options, callback);
}

function createRepo(req,res) {
    console.log(req.body.reponame);
    
    var options= {
        url : 'https://api.github.com/user/repos?access_token=540398dbda95253a9fb85e1f1dcfb3f1dfc5459c',
        headers : {
            'User-Agent' : 'test',
            'Accept' : 'application/vnd.github.mercy-preview+json',
            'Content-Type' : 'application/json',
        },
        json: {
            name :req.body.reponame
        }
    }

    function callback(error, response, body) {
        if (!error) {
            res.status(201).json({
                msg: `${body.name} has ben created`
                
            })
        } else {
            res.status(500).json({
                msg: 'error',
                msg: error.message
            })
        }
    }

    request.post(options,callback)
}

module.exports = {
    getOwnRepo,
    createRepo,
    searchRepo
};
