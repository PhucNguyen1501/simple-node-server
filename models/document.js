const { DataTypes } = require('sequelize');
const db = require('./index');

const Document = db.sequelize.define('Document', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Document;
