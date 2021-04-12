const router = require('express').Router();
const TaskController = require('../controllers/TaskController.js');
const authenticate = require('../middlewares/authenticate.js');
const authorize = require('../middlewares/authorize.js');

router.use(authenticate);

router.post('/', TaskController.createTask);

router.get('/', TaskController.getAll);

router.use('/:id', authorize);

router.put('/:id', TaskController.editTask);

router.patch('/:id', TaskController.changeTaskCategory);

router.delete('/:id', TaskController.deleteTask);

module.exports = router;
