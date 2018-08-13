const router = require('express').Router()
const gitHubController = require('../controllers/github')

router.get('/', gitHubController.findListUser)
      .get('/search/:name', gitHubController.searchRepo)
      .post('/create', gitHubController.createRepo)


module.exports = router