const router = require('express').Router();
const users = require('./users.js');
const categories = require('./categories.js');
const tasks = require('./tasks.js');

router.use('/users', users);

router.use('/categories', categories);

router.use('/tasks', tasks);

module.exports = router;
