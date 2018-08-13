const express = require('express')
const router = express.Router()
const controllersAuth = require('../controllers/auth')

router.post('/register', controllersAuth.add)
      .post('/login', controllersAuth.login)
      .post('/loginFacebook', controllersAuth.loginFacebook)  

module.exports = router