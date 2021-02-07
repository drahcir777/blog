const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Category = require('./categories/Categories');
const Article = require('./articles/Article');

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

conn.authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!");
  })
  .catch((error) => {
    console.log("Error: ", error)
  });

app.use("/", categoriesController);
app.use("/", articlesController);

app.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll()
    return res.render("index", { articles });
  } catch (error) {
    console.log("Error", error)
  }
})

app.listen(8080, () => {
  console.log("O servidor foi iniciado")
})