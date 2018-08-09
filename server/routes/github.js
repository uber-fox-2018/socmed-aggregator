const express = require('express');
const router = express.Router();

const { signinFacebook, listRepository, search, postRepository } = require('../controllers/github')

router.post('/signin/facebook', signinFacebook)
router.get('/myrepository', listRepository)
router.get('/repospublic', search)
router.post('/createrepos', postRepository)

module.exports = router;
