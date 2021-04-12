const { Task } = require('../models');

class TaskController {
  static async createTask(req, res, next) {
    try {
      const UserId = req.decoded.id;
      const { title, CategoryId } = req.body;

      const newTask = {
        title,
        CategoryId,
        UserId,
      };

      const data = await Task.create(newTask);

      if (!data) throw err;

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await Task.findAll({
        include: ['User', 'Category'],
      });

      if (!data) throw err;

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async editTask(req, res, next) {
    try {
      const UserId = req.decoded.id;
      const { id } = req.params;
      const { title, CategoryId } = req.body;

      const editedTask = {
        title,
        CategoryId,
        UserId,
      };

      const data = await Task.update(editedTask, {
        where: { id },
        returning: true,
      });

      if (!data) throw err;

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async changeTaskCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { CategoryId } = req.body;

      const data = await Task.update(
        { CategoryId },
        {
          where: { id },
          returning: true,
        }
      );

      if (!data) throw err;

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Task.destroy({
        where: { id },
      });

      if (!data) throw err;

      res.status(200).json({
        msg: 'task deleted',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
