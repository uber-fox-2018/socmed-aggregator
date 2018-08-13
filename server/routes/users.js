var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user-controller')

/* GET users listing. */
router.post('/signUp', UserController.signUpUser)
router.post('/signIn', UserController.signInUser)
router.post('/loginFacebook', UserController.loginFacebook)

module.exports = router;
