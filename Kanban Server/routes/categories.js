const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController.js');
const authenticate = require('../middlewares/authenticate.js');

router.use(authenticate);

router.post('/', CategoryController.createCategory);

router.get('/', CategoryController.getCategory);

router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
