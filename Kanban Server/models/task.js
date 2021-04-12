'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id',
      }),
        Task.belongsTo(models.Category, {
          foreignKey: 'CategoryId',
          targetKey: 'id',
        });
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Input title should not be empty',
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: 'CategoryId input must be integer',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: 'UserId input must be integer',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
