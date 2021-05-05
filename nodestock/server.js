const express = require('express') // her henter vi express fra et bibliotek, som jeg hentede tidligere
const mongoose = require('mongoose') // Her requirer vi mongoose biblioteket
const Article = require('./models/article')
const articleRouter = require('./routes/articles') // her requirer vi at der kan bruges routes fra filen articles
const methodOverride = require('method-override') // Gør så det er muligt at bruge router.delete 
const app = express() // Her har vi app variablen, som vi får fra at kalde express

mongoose.connect('mongodb://localhost/forum', { useNewUrlParser: true, useUnifiedTopology: true }) // Her connectes der til databasen 
app.use(express.urlencoded({ extended: false}))


app.set('view engine', 'ejs') // her assigner vi view enginen til ejs, så den kan konvertere ejs kode til html

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', { articles: articles }) // Her gøres der så vi renderer index.ejs filen, så der kan skrives der i stedet
})

app.use('/articles', articleRouter) // her gøres der at article routeren er ved /articles. Hver gang der tilføjes en ny route vil det tilføjes til efter /articles. Fx /articles/edit

app.listen(25565) //her startes porten

app.use(express.static('public'));