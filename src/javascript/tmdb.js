// import fetch from 'node-fetch'
// const fetch = require('node-fetch')

const API_KEY = process.env.TMDB_API_KEY;

// const BASE_URL = 'https://api.themoviedb.org/3/movie/'


async function searchMovie(movieName) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
}



async function findSimilar(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
}





module.exports = {searchMovie, findSimilar};

