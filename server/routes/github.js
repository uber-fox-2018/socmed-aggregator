var express = require('express');
var router = express.Router();
const { getMe, getUser, getUserRepo, createRepo } = require('../controllers/github')
const { isLogin } = require('../middleware/isLogin')

/* GET users listing. */
router.get('/me',isLogin, getMe)
router.get('/search', getUser)
router.post('/repos', getUserRepo)
router.post('/create/repos', createRepo)

module.exports = router;
