const request = require('request');

const searchUser = (req, res) => {
  let options = {
    url: `https://api.github.com/search/users?q=${req.query.name}`,
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/vnd.github.mercy-preview+json'
    }
  };

  function callback(error, response, body) {
    if (!error) {
      res.status(response.statusCode).json(JSON.parse(body));
    } else {
      res.status(500).json({msg: error});
    }
  }
   
  request(options, callback);
  
}

module.exports = {
  searchUser
};
