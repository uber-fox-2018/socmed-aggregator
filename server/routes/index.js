const router = require('express').Router()
const { signIn, signInFb } = require('../controllers/user_controller');
const { getOwnRepo, searchRepo, createRepo} = require('../controllers/repo_controller');


router.post('/signin', signIn)
    .post('/signin/fb',signInFb)
    .post('/', searchRepo)
    .get('/getOwnRepo',getOwnRepo)
    .post('/createRepo', createRepo)


module.exports = {
    router
};
