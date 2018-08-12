const router = require('express').Router();
const {getMyRepo, login} = require('../controllers/index');

router.route('/')
  .get((req, res) => {
    res.json({msg: 'this is home'})
  })

router.route('/login')
  .post(login)

router.route('/me')
  .get(getMyRepo)

module.exports = router
