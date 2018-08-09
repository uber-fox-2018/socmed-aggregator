const express = require('express');
const router = express.Router();
const {getUserRepo, searchTopic, createRepo} = require ('../controllers/git')
const {auth} = require ('../middlewares/auth') 

/* GET users listing. */
router.get('/getrepo/', auth, getUserRepo)
router.get('/searchtopic/', auth, searchTopic)
router.post('/createrepo/', auth, createRepo)

module.exports = router;
