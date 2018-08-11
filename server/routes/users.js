const router = require('express').Router()
const { searchUser } = require('../controllers/controllerUsers')
const reposRouter = require('./repositories')

router.get('/', function(req, res) {
    // res.send('User connect')
})

router.use('/repos', reposRouter)
router.post('/', searchUser)

module.exports = router