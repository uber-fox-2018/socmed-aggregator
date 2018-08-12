var express = require('express');
var router = express.Router();
const {add,login,show,loginFb} = require('../controllers/user')

/* GET home page. */
router.post('/login',login)
router.post('/login/facebook',loginFb)
router.get('/users',show)
router.post('/register',add)

module.exports = router;
