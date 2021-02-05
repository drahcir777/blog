const express = require('express');
const router = express.Router();
const Category = require('./Categories');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
    res.render("admin/categories/new");
})

router.post('/categore/save', async (req, res) => {
    const { title } = req.body
    titleDown = title.toLowerCase()

    const categores = await Category.findOne({
        where: {
            title: titleDown
        }
    })
    if (!categores && categores !== undefined) {
        try {
            const categore = await Category.create({
                title: titleDown,
                slug: slugify(titleDown)
            })
            return res.redirect("/")
        } catch (error) {
            console.log("ERROR", error)
        }
    } else {
        return res.redirect("/admin/categories/new")
    }
})

router.get('/admin/categories', async (req, res) => {
    try {
        const categore = await Category.findAll()
        return res.render("admin/categories/index", { categore })
    } catch (error) {
        console.log("ERROR: ", error)
    }
})

router.post('/categories/delete', async (req, res) => {
    const { id } = req.body
    try {
        if (id !== undefined) {
            if (!isNaN(id)) {
                Category.destroy({
                    where: {
                        id
                    }
                })
                return res.redirect("/admin/categories");
            } else {
                return res.redirect("/admin/categories");
            }
        } else {
            return res.redirect("/admin/categories");
        }
    } catch (error) {
        console.log("Error:", error)
    }
    return res.redirect("/")
})

router.get('/admin/categories/edit/:id', async (req, res) => {

    const { id } = req.params
    try {
        const categore = await Category.findByPk(id)
        if (categore !== undefined) {
            return res.render("admin/categories/edit", { categore })
        } else {
            return res.redirect("/admin/categories");
        }
    } catch (error) {
        console.log("Error: ", error)
    }
})

router.post('/categories/update', async (req, res) => {
    const { id, title } = req.body;
    try {
        await Category.update({ title: title, slug: slugify(title) }, {
            where: {
                id: id
            }
        })
        return res.redirect("/admin/categories");
    } catch (error) {
        console.log("Error:", error)
    }
})
module.exports = router