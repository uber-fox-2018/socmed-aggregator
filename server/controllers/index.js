const request = require('request');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

const getMyRepo = (req, res) => {
  let user = 'kneric';
  let options = {
    url: `https://api.github.com/users/${user}`,
    headers: {
      'User-Agent': 'request',
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

const login = (req, res) => {
  let authResponse = req.body
  let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`
  
  let options = {
    url: url
  };

  function callback(error, response, body) {
    
    if (!error && response.statusCode == 200) {
      let userFb = JSON.parse(body);

      user.findOne({email: userFb.email})
      .then((userOnDb) => {

        if(userOnDb) {
          let token = jwt.sign({
            id: userOnDb._id,
            name: userOnDb.name,
          }, process.env.secretKey)

          res.status(200).json({token});
        } else {

          return user.create({
            idFacebook : userFb.id,
            name : userFb.name,
            email : userFb.email
          })
          .then(data => {
            let token = jwt.sign({
              id: userOnDb._id,
              name: userOnDb.name,
            }, process.env.secretKey)

            res.status(200).json({token});
          })
        }
      })
      .catch((err) =>{
        res.status(500).json({
            err: err.message
        })
      })
    } else {
      res.status(500).json({msg: error});
    }
  }

  request(options, callback);

}

module.exports = {
  getMyRepo,
  login
};