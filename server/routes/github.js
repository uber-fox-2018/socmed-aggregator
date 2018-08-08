const express = require('express');
const router = express.Router();

const { listRepository, search, postRepository } = require('../controllers/github')

router.get('/myrepository', listRepository)
router.get('/repospublic', search)
router.post('/createrepos', postRepository)

module.exports = router;
