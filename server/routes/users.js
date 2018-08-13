const router = require('express').Router()
const Controller = require('../controllers/users')
const Aunthetication = require('../middleware/auth')
const Authorization = require('../middleware/authoriz')

router.post('/signup', Controller.userSignUp)
router.post('/login', Aunthetication, Controller.userLogin)
router.post('/signin/facebook', Authentication, Controller.loginFb)

module.exports = router