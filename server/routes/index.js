var express = require('express');
var router = express.Router();
const {userRepoList, createRepo, searchRepo} = require('../controllers/githubController')
const {register} = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hi, Setia')
})

router.get('/repo', userRepoList)
      .post('/repo/create', createRepo)
      .get('/repo/search', searchRepo)
      .post('/register', register)

module.exports = router;
