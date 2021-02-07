const express = require('express');
const router = express.Router();

const Category = require('../categories/Categories');
const Articles = require('../articles/Article');
const slugify = require('slugify');


router.get('/admin/articles', async (req, res) => {
  try {
    const articles = await Articles.findAll({
      include: [{ model: Category }]
    })
    res.render("admin/articles/index", { articles });
  } catch (error) {
    console.log("Error", error)
  }
});

router.get('/admin/articles/new', async (req, res) => {

  try {
    const categore = await Category.findAll()
    res.render("admin/articles/new", { categore });
  } catch (error) {
    console.log("Error", error)
  }

})

router.post('/articles/save', async (req, res) => {
  const { title, body, category } = req.body

  console.log()
  try {
    await Articles.create({
      title,
      slug: slugify(title),
      body,
      categoryId: category
    })
    res.redirect("/admin/articles");
  } catch (error) {
    console.log("Error", error)
  }

})

router.post('/articles/delete', async (req, res) => {
  const { id } = req.body
  try {
    if (id !== undefined) {
      if (!isNaN(id)) {
        await Articles.destroy({
          where: {
            id
          }
        })
        return res.redirect("/admin/articles");
      } else {
        return res.redirect("/admin/articles");
      }
    } else {
      return res.redirect("/admin/articles");
    }
  } catch (error) {
    console.log("Error:", error)
  }
  return res.redirect("/")
})

module.exports = router;