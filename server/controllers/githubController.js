const request = require('request')

class GithubController {
    static userRepoList(req, res){
        var options = {
            url: 'https://api.github.com/user/repos',
            headers: {
              'User-Agent': 'request',
              'Accept': 'application/vnd.github.nightshade-preview+json',
              'Authorization': `token ${process.env.access_token}`
            }
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
            //   console.log(info)
            //   info.forEach(data => {
            //       console.log(data.name)
            //   })
            //   console.log(info.length)
              res.status(200).json(info)
            } else {
                console.log(body)
                res.status(500).json(error)
            }
        }
           
        request(options, callback);
    }

    static createRepo(req, res){
        request.post({
            url: 'https://api.github.com/user/repos',
            headers: {
                'User-Agent': 'request',
                'content-type': 'application/json',
                'Authorization': `token ${process.env.access_token}`
            },
            json: {
                'name': req.body.name
            }
        }
        , function (err, response, body) {
            if(err) res.status(500).json(err)
            res.status(200).json(body)
        })
    }

    static searchRepo(req, res){
        var options = {
            url: `https://api.github.com/search/repositories?q=${req.query.q}`,
            headers: {
              'User-Agent': 'request',
              'Accept': 'application/vnd.github.nightshade-preview+json',
              'Authorization': `token ${process.env.access_token}`
            }
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              res.status(200).json(info)
            } else{
                res.status(500).json(error)
            }
        }
           
        request(options, callback);
    }
}

module.exports = GithubController