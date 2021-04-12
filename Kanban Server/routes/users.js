const router = require('express').Router();
const UserController = require('../controllers/UserController.js');
const authenticate = require('../middlewares/authenticate.js');
const authorize = require('../middlewares/authorize.js');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/googlelogin', UserController.googleLogin);

router.use(authenticate);

router.patch('/:id', UserController.changeUsername);

module.exports = router;
