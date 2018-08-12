const router = require('express').Router();
const controllersFind = require('../controllers/git/find')
const controllersList = require('../controllers/git/list')
const controllers = require('../controllers/git/myGit')


router.get('/findUser/:name', controllersFind.findUser);
router.get('/findRepo/:name', controllersFind.findRepo);
router.get('/findIssues/:name', controllersFind.findIssues);
router.get('/findTopics/:name', controllersFind.findTopics);

router.get('/user/:username/repos', controllersList.usersRepositories);
router.get('/my/repos', controllersList.myRepositories);

router.post('/my/repos/create', controllers.create);
router.post('/login',controllers.login)
// router.post('/my/repos/create', controllers.create);
// router.post('/my/repos/create', controllers.create);

module.exports = router;