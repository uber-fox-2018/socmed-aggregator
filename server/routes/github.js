var express = require('express');
var router = express.Router();
var GitHubController = require('../controllers/github-controller')

/* GET github listing. */
router.get('/search/:name', GitHubController.searchUser);
router.get('/listrepo', GitHubController.listRepo);
router.post('/createrepo', GitHubController.createRepo);

module.exports = router;
