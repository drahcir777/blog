const Sequelize = require('sequelize');

const conn = new Sequelize('guiapress', 'root', 'mimi123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = conn