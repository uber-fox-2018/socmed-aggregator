const router = require('express').Router()

router.get('/', function(req,res) {
    res.send('home')
})

module.exports = router