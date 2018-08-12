var express = require('express');
var router = express.Router();
const {getGithub,search,createRepo} = require('../controllers/github')
const {AuthUser} = require('../controllers/auth')

router.get('/',AuthUser,getGithub)
router.get('/search',AuthUser,search) // req.guery.keyword
router.post('/create',AuthUser,createRepo) // req.body.name

module.exports = router;