const router = require('express').Router();
const auth      = require('../helpers/auth');
const isLogin = require('../helpers/isLogin');
const {home, listUserRepos, searchUsers, newRepo} = require('../controllers/index');

const authUser  = auth(['customer', 'admin'])
const authAdmin = auth(['admin'])

router.get('/', home);
router.get('/list', isLogin, authUser, listUserRepos)
router.get('/search', isLogin, authUser, searchUsers)
router.post('/create',isLogin, authAdmin, newRepo)

module.exports = router;