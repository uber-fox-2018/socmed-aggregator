const router = require('express').Router();
const {searchUser} = require('../controllers/search');

router.route('/user')
  .get(searchUser);  

module.exports = router
