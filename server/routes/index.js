const express = require('express');
const router = express.Router();
const controller = require('../controllers/githubapi')

/* GET home page. */
router.get('/',  controller.getUser);
router.post('/',  controller.createRepo);
router.get('/search',  controller.search);

module.exports = router;
