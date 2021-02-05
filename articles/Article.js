const Sequelize = require('sequelize');
const conn = require('../database/database');
const Cartegory = require('../categories/Categories');

const Article = conn.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Cartegory.hasMany(Article);
Article.belongsTo(Cartegory);

module.exports = Article;