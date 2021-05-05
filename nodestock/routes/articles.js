const { request } = require('express')
const express = require('express')
const Article = require('./../models/article') // Her importeres article modelen der ligger i models/article
const router = express.Router()

router.get('/new', (req, res) => { // Denne route er når man skal lave en ny artikel
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => { // Denne route er når man skal redigere en allerede eksisterende artikel
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/:id', async (req, res) => { // Denne route køres når man skal have vist en artikel
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => { //Denne route er når der skal gemmes en ny artikel
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => { // Denne route er når der skal gemmes en redigeret artikel
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => { // Denne route er når der skal slettes en artikel
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path) { // Denne funktion er hvad der bruges til både post og put routen
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.tekst = req.body.tekst
        try {
            article = await article.save()
            res.redirect(`/articles/${article.id}`)
        } catch (e) {
            res.render(`articles/${path}`, { article: article })
        }
    }
}

module.exports = router