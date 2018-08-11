const router = require('express').Router()
const userRouter = require('./users')
const { loginUser, loginWithFb } = require('../controllers/controllerUsers')

router.post('/signin', loginUser)
router.post('/signin/facebook', loginWithFb)
router.use('/user', userRouter)
router.get('/', function(req, res) {
    // console.log('Alive');
    // res.send('Masuk Router')
})


module.exports = router