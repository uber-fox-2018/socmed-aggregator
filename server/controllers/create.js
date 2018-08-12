const request = require('request');

const createRepo = (req, res) => {
  let {name, description} = req.body
  let options = {
    url: `https://api.github.com/user/repos?access_token=${process.env.tokenGH}`,
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/vnd.github.mercy-preview+json',
      'content-type': 'application/json'
    },
    json: {
      "name": name,
      "description": description
    }
  };

  function callback(error, response, body) {
    if (!error) {
      res.status(response.statusCode).json({msg: 'create repo success', data: body});
    } else {
      res.status(500).json({msg: error});
    }
  }
   
  request.post(options, callback);
  
}

module.exports = {
  createRepo
};