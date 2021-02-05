const Sequelize = require('sequelize');

const conn = new Sequelize('guiapress', 'root', 'mimi1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = conn