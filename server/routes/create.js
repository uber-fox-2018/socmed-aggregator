const router = require('express').Router();
const {createRepo} = require('../controllers/create');
const auth = require('../middlewares/auth');

router.route('/')
  .post(auth, createRepo); 

module.exports = router
