var express = require('express');
var router = express.Router();
var github = require('../controller/github.js')
const UserController = require('../controller/userController.js')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/myRepo',github.getRepo)
router.post('/createRepo',UserController.authentication,github.createRepo)
router.get('/searchRepo',UserController.authentication,github.searchRepo)
module.exports = router;
