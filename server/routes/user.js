const router = require('express').Router()
const { signUp, signIn } = require('../controllers/user')

router.post('/users/signin', signIn)
router.post('/users/signup', signUp)

module.exports = router