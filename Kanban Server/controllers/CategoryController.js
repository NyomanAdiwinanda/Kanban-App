const { Category } = require('../models');

class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const newCategory = {
        name,
      };

      const data = await Category.create(newCategory);

      if (!data) throw err;

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const data = await Category.findAll({
        order: [['id', 'ASC']],
      });

      if (!data) throw err;

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const checkId = await Category.findByPk(id);

      if (!checkId)
        throw {
          name: 'CustomError',
          msg: 'Id not found',
          status: 404,
        };

      const data = await Category.destroy({
        where: { id },
      });

      if (!data) throw err;

      res.status(200).json({
        msg: 'Category deleted',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
