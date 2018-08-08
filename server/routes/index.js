const router    = require('express').Router()
const {index,  listUserRepos, searchUser, createRepo} = require('../controllers/index')

router.get('/', index)
router.get('/list/:username', listUserRepos)
router.get('/users/:username', searchUser)
router.post('/create/:token/:repoName', createRepo)

module.exports = router;