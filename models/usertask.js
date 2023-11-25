'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userTask extends Model {
    // ...
  }

  userTask.init({
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    taskId: {
      type: DataTypes.INTEGER,
      references: { model: 'tasks', key: 'id' }
    }
    // Additional attributes if necessary
  }, {
    sequelize,
    modelName: 'userTask',
    tableName: 'user_tasks' // Explicitly set table name to match your database
  });

  return userTask;
};
