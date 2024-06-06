const { DataTypes } = require('sequelize');
const db = require('./index');
const User = require('./user');
const Document = require('./document');

const Signature = db.sequelize.define('Signature', {
  signature: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dateSigned: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

Signature.belongsTo(User);
Signature.belongsTo(Document);

module.exports = Signature;
