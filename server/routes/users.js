var express = require('express');
var router = express.Router();
const UserController = require('../controller/userController.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',UserController.loginFb)

module.exports = router;
