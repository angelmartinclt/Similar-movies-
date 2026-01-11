require('dotenv').config()
const path = require('path');
const express = require('express');
const hbs = require ('hbs');
const app = express();



const { searchMovie, findSimilar }= require('./tmdb');

//path
const publicDir = path.join(__dirname, '../../public')
const viewsDir = path.join(__dirname, '../templates/views')

const partialsDir = path.join(__dirname, '../templates/partials')

//handlers
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

//setup
app.use(express.static(publicDir))


//index page
app.get('/', (req,res) =>{
    res.render('index',{
        headerTitle: 'Find groundbreaking films, experience breathtaking stories',
        pageTitle: 'Home page',
    })
})

//search
app.get("/search", async (req,res) => {
    const movie = req.query.movie
    // const results = await findSimilar(movie)
    const results = await searchMovie(movie)
    res.render("results", {
        headerTitle: 'Find groundbreaking films, experience breathtaking stories',
        movies: results,
        pageTitle: "Results for : " + movie
    })
})

//similar
app.get('/similar', async (req, res) => {
    const id = req.query.id
    const results = await findSimilar(id)

    res.render ('results', {
        headerTitle: 'Find groundbreaking films, experience breathtaking stories',
        movies: results,
        pageTitle: 'Similar movies :'
    })
})

//letterbox
app.get('/letterboxd',  (req, res) => {

    res.render ('letterbox', {
        headerTitle: 'Find groundbreaking films, experience breathtaking stories',
        pageTitle: 'Letterboxd'
    })
})

//404
app.use((req, res) => {
    res.render('404', {
        pageTitle: '404',
        errorMessage: 'Page not found.'
    })
})

//server
const PORT = 3000
app.listen(PORT, () => {
    console.log('Server is running', PORT)
})