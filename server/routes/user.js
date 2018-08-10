const express = require('express');
const router = express.Router();
const {login} = require ('../controllers/user.js')
// const {register} = require ('../controllers/user.js')

router.post('/login', login)

module.exports = router;