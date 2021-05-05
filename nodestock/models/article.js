const mongoose = require('mongoose') //Importering af mongoose

const articleSchema = new mongoose.Schema({ //Her laves der et schema, hvor der er de forskellige muligheder artiklerne har
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tekst: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Article', articleSchema)