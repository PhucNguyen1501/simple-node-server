const { DataTypes } = require('sequelize');
const db = require('./index');
const Document = require('./document');

const Field = db.sequelize.define('Field', {
  fieldName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

Field.belongsTo(Document);

module.exports = Field;
