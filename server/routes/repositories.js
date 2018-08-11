const router = require('express').Router()
const { createRepos } = require('../controllers/controllerRepos')


router.post('/create', createRepos)


module.exports = router