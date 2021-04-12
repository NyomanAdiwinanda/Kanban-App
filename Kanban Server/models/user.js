'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { hashPass } = require('../helpers/bcrypt.js');
  const defaultUsername = require('../helpers/defaultUsername.js');
  const checkPassword = require('../helpers/checkPassword.js');
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'UserId',
        sourceKey: 'id',
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email format',
          },
        },
        unique: {
          args: true,
          msg: 'Email already registered',
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          passwordRequirement(value) {
            if (checkPassword(value) === false) {
              throw new Error(
                'Password must be at least contain a capital letter, a number or symbol, and minimum of 6 characters'
              );
            }
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Input username should not be empty',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (User) => {
          User.password = hashPass(User.password);
          User.username = defaultUsername(User.email);
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
