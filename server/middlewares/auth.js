function auth (req, res, next) {
  let token = localStorage.getItem('token');

  console.log(token);

  if(token){
    next()
  } else {
    res.status(401).json({
      msg: 'login first'
    })
  }
}

module.exports = auth;