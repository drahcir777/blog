const express = require('express');
const router = express.Router();
const Caterory = require('./Categories');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
  res.render("admin/categories/new");
});

router.post('/categore/save', async (req, res) => {
  const { title } = req.body
  titleDown = title.toLowerCase();
  if (titleDown !== undefined) {
    const categores = await Caterory.create({
      title: titleDown,
      slug: slugify(titleDown)
    })

    return res.redirect("/")

  } else {
    return res.redirect("/admin/categories/new");
  }
});

module.exports = router;