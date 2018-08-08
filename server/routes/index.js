var express = require('express');
var router = express.Router();
const {userRepoList, createRepo, searchRepo} = require('../controllers/githubController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hi, Setia')
})

router.get('/users/repo', userRepoList)
      .post('/users/repo/create', createRepo)
      .get('/users/repo/search', searchRepo)

module.exports = router;
