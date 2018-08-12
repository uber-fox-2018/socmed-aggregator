const router = require('express').Router();
const {createRepo} = require('../controllers/create');

router.route('/')
  .post(createRepo); 

module.exports = router
