//TMDB

const API_KEY = `api_key=cacf8b1dd6bff1965ded0dbc3aac6fa2`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL = BASE_URL + `/discover/movie?sort_by=popularity.desc&` + API_KEY;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const SEARCH_URL = BASE_URL + `/search/movie?` + API_KEY;
const DRAMA_URL = `/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&`;
const DRAMA_JONE = BASE_URL + DRAMA_URL + API_KEY;
const HIGH_URL = `/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&`;
const HIGH_MOVIE = BASE_URL + HIGH_URL + API_KEY;


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const drama = document.querySelector('.drama-container');

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(response => response.json()).then(data => {
        console.log(data);

        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `<img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                            <div class="movie-info">
                                <h3>${movie.title}</h3>
                                <span class="heart"><i class="ri-heart-line"></i></span>
                            </div>

                            <div class="overview">
                                <h3>overview:</h3>
                                ${movie.overview}
                            </div>`;

        main.appendChild(movieEl);
    });
}


form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL + `&query=` + searchTerm);
    } else {
        getMovies(API_URL);
    }
})

getDrama(DRAMA_JONE);

function getDrama(url) {

    fetch(url).then(response => response.json()).then(data => {
        console.log(data);

        showDrama(data.results);
    })
}

function showDrama(dramas) {
    let html = '';

    dramas.forEach(drama => {
        if (drama) {
            //console.log(drama.poster_path);
            if (drama.poster_path !== null) {
                html += `<div class="drama">
                        <img src="${IMG_URL + drama.poster_path}" alt="image">
                        <div class="drama-info">
                            <h3>${drama.title}</h3>
                            <span class="vote">${drama.vote_average}</span>
                        </div>
                    </div>`
            }
        }
    })

    drama.innerHTML = html;
}

const highestMovie = document.querySelector('.highest-rated-movies');
const highestMovies = document.querySelectorAll('.highest');

getHighest(HIGH_MOVIE);

function getHighest(url) {

    fetch(url).then(response => response.json()).then(data => {
        console.log(data);

        showHighest(data.results);
    })
}

function showHighest(highestMovies) {
    let html = '';

    highestMovies.forEach(hiMovie => {
        if (hiMovie) {
            console.log(hiMovie.poster_path);
            if (hiMovie.poster_path !== null) {
                html += `<div class="highest">
                        <img src="${IMG_URL + hiMovie.poster_path}" alt="image">
                        <div class="highest-info">
                            <h3>${hiMovie.title}</h3>
                            <span class="vote">${hiMovie.vote_average}</span>
                        </div>
                    </div>`
            }
        }
    })

    highestMovie.innerHTML = html;
}

const signUpBtn = document.querySelector('.sign-up-button');
const signUp = document.querySelector('.sign-up');
const signInBtn = document.querySelector('.sign-in-button');
const signIn = document.querySelector('.sign-in');

signUpBtn.addEventListener('click', () => {
  signUp.classList.add('active');
})

signInBtn.addEventListener('click', () => {
  signUp.classList.remove('active');
})
