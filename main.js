//TMDB

const API_KEY = `api_key=cacf8b1dd6bff1965ded0dbc3aac6fa2`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL = BASE_URL + `/discover/movie?sort_by=popularity.desc&` + API_KEY;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const SEARCH_URL = BASE_URL + `/search/movie?` + API_KEY;
const DRAMA_URL = `/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&`;
const DRAMA_JONE = BASE_URL + DRAMA_URL + API_KEY;
const HIGH_URL = `/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&`;
const HIGH_DRAMA = BASE_URL + HIGH_URL + API_KEY;


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
                                <span class="${getColor(movie.vote_average)}">${movie.vote_average}</span>
                            </div>
                            
                            <!--<div class="overview">
                                <h3>overview:</h3>
                                ${movie.overview}
                            </div>-->`;

        main.appendChild(movieEl);
    });
}

function getColor(vote) {
    if(vote >= 8) {
        return 'green';
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red';
    }
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

const highestDrama = document.querySelector('.highest-rated-drama');
const highestDramas = document.querySelectorAll('.highest');

getHighest(HIGH_DRAMA);

function getHighest(url) {

    fetch(url).then(response => response.json()).then(data => {
        console.log(data);

        showHighest(data.results);
    })
}

function showHighest(highestDramas) {
    let html = '';

    highestDramas.forEach(hiDrama => {
        if (hiDrama) {
            console.log(hiDrama.poster_path);
            if (hiDrama.poster_path !== null) {
                html += `<div class="highest">
                        <img src="${IMG_URL + hiDrama.poster_path}" alt="image">
                        <div class="highest-info">
                            <h3>${hiDrama.title}</h3>
                            <span class="vote">${hiDrama.vote_average}</span>
                        </div>
                    </div>`
            }
        }
    })
    
    highestDrama.innerHTML = html;
}

const signUpBtn = document.querySelector('.sign-up-button');
const signUp = document.getElementById('sign-up');
const signInBtn = document.querySelector('.sign-in-button');
const signIn = document.getElementById('sign-in');
const showSign = document.querySelector('.sign-in');
const signContainer = document.querySelector('.sign-container');
const menu = document.querySelector('.menu i');
const nav = document.querySelector('.nav');
const signCloseBtn = document.querySelector('.sign-close')

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
  signUp.classList.add('active');
})

signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
  signUp.classList.remove('active');
})

showSign.addEventListener('click', (e) => {
    e.preventDefault();
   signContainer.classList.toggle('active');
})

signCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
   signContainer.classList.remove('active');
})

menu.addEventListener('click', () => {
    nav.classList.toggle('active');
})


window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        document.querySelector('.header').style.background = "#000";
    } else {
        document.querySelector('.header').style.background = "transparent";
    }
})

//slide-container slide js code
let slider = document.querySelector('.drama-zone');
let innerslider = document.querySelector('.drama-container');
let pressed = false; /*?????????????????? ???????????? ???????????? ?????? - default??? false*/
let startX; /*????????? ????????? ????????? x?????? ?????? - ?????? ????????? ???????????? grab?????? ???????????? ??????????????? ??? ??? grab??? ????????? x????????? ???????????? ??????*/
let x; /*????????? ????????? ??? x?????? ?????? - ??? ???????????? grab?????? ???????????? ????????????, ????????? ????????? ??? ????????? x????????? ???????????? ??????*/

/*??? startX??? ????????? ?????????????????? ???????????? ?????? ??????. ?????? ??? ????????? ?????? ????????? ??? ?????? ??????
x??? innerslider.style.left = '0px'??? ???????????? ??? ???????????? ??????????????? ????????? ????????? ??????*/

slider.addEventListener('mousedown', e => {
    pressed = true; /*????????? ??????????????? ?????? true??? ????????? ???*/ 
    startX = e.offsetX - innerslider.offsetLeft; /*innerslider.offsetParent??? div.slider*/
    slider.style.cursor = "grabbing"; /*grabbing??? ?????? ?????? ????????? ??????*/
})
/*mousedown() ???????????? ?????? ?????? ?????? ????????? ???????????? ?????? ???????????? ????????? ????????? ????????? ????????? ?????????
e.offsetX??? e.offsetY ??? ?????? ????????? ???????????? ??? ???????????? X,Y ????????? ??????
????????? e.offsetX??? slider?????? ???????????? mousedown ????????? ??? x?????????, ????????? ????????? ???????????? ?????????
offsetLeft??? offsetParent??? ???????????? ?????? ????????? ??????????????? ????????? ????????? ???????????? ?????????*/ 

slider.addEventListener('mouseenter', () => {
    slider.style.cursor = "grab" /*grab??? ?????? ??? ????????? ???????????? ????????? ??????*/
})

slider.addEventListener('mouseup', () => {
    slider.style.cursor = "grab"
})

window.addEventListener('mouseup', () => {
    pressed = false;
})

function checkBoundary() {
    let outer = slider.getBoundingClientRect();
    let inner = innerslider.getBoundingClientRect();
    /*getBoundingClientRect() ???????????? ???????????? ?????? ????????? ?????? ???????????? ?????? ??? ??????*/

    if(parseInt(innerslider.style.left) > 0) {
        innerslider.style.left = '0px';
    } else if (inner.right < outer.right) {
        innerslider.style.left = `-${inner.width - outer.width}px`
    }
    /*innerslider.style.left??? innerslider??? ?????????????????? ???????????? ????????? ????????? ?????????, position:absolute??? ????????????
    ??????????????? relative ?????? ????????? ??????????????? ???????????? ???
    parseInt()??? ????????? ??????????????? ??????
    innerslider.style.left ?????? ???????????? 0?????? ??? ????????? left ?????? ????????? ????????? ??????
    ??? slider??? ?????????????????? drag ??? ??? ?????? ?????? ???????????? ??????
    inner.right < outer.right ??? ??????????????? ??? slider ????????? ???????????? ???, 
    ??? ????????? ???????????? slider ?????? ???????????? ?????? ??????*/
}
/*checkBoundary() ????????? slider??? ???????????? ????????? ???????????? boundary??? ???????????? ????????? ????????? ??????*/

slider.addEventListener('mousemove', e => {
    if(!pressed) return 
    e.preventDefault();
    x = e.offsetX;

    innerslider.style.left = `${x - startX}px`;
    checkBoundary();
})
/*drag??? ???????????? ????????????, preventDefault() ??? ?????? ???????????? ?????? ????????? ??????????????? ?????? 
??? ???????????? ???????????? ?????? ????????? ?????? checkboundary() ????????? ???????????? ?????? ?????? ????????? ????????? ????????????*/

let slider2 = document.querySelector('.highest-drama-zone');
let innerslider2 = document.querySelector('.highest-rated-drama');
let pressed2 = false;
let startX2; 
let x2; 

slider2.addEventListener('mousedown', e => {
    pressed2 = true; 
    startX2 = e.offsetX - innerslider2.offsetLeft; 
    slider2.style.cursor = "grabbing"; 
})

slider2.addEventListener('mouseenter', () => {
    slider2.style.cursor = "grab" 
})

slider2.addEventListener('mouseup', () => {
    slider2.style.cursor = "grab"
})

window.addEventListener('mouseup', () => {
    pressed2 = false;
})

function checkBoundary2() {
    let outer = slider2.getBoundingClientRect();
    let inner = innerslider2.getBoundingClientRect();

    if(parseInt(innerslider2.style.left) > 0) {
        innerslider2.style.left = '0px';
    } else if (inner.right < outer.right) {
        innerslider2.style.left = `-${inner.width - outer.width}px`
    }
}

slider2.addEventListener('mousemove', e => {
    if(!pressed2) return 
    e.preventDefault();
    x2 = e.offsetX;

    innerslider2.style.left = `${x2 - startX2}px`;
    checkBoundary2();
})
