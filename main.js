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
let pressed = false; /*클릭되었는지 아닌지를 체크하는 변수 - default는 false*/
let startX; /*마우스 드래그 시작점 x좌표 체크 - 쉽게 말하면 이미지를 grab하여 이미지를 움직이려고 할 때 grab한 지점의 x좌표를 체크하는 변수*/
let x; /*마우스 드래그 시 x좌표 체크 - 즉 이미지를 grab하여 왼쪽으로 움직이면, 움직여 이동한 그 지점의 x좌표를 체크하는 변수*/

/*즉 startX는 처음에 드래그하려고 이미지를 잡은 지점. 문서 맨 왼쪽이 아닌 요소의 맨 왼쪽 기준
x는 innerslider.style.left = '0px'을 기준으로 내 마우스가 최종적으로 위치한 지점의 좌표*/

slider.addEventListener('mousedown', e => {
    pressed = true; /*클릭이 되었으므로 값은 true가 되어야 함*/ 
    startX = e.offsetX - innerslider.offsetLeft; /*innerslider.offsetParent는 div.slider*/
    slider.style.cursor = "grabbing"; /*grabbing은 잡고 있는 모양의 커서*/
})
/*mousedown() 이벤트는 특정 태그 위에 마우스 포인터가 있는 상태에서 마우스 버튼을 눌렀을 경우에 실행됨
e.offsetX나 e.offsetY 는 해당 객체를 기준으로 한 마우스의 X,Y 좌표를 말함
여기서 e.offsetX는 slider에서 마우스가 mousedown 되었을 때 x좌표로, 얼마나 떨어져 있는가를 나타냄
offsetLeft는 offsetParent를 기준으로 각각 요소가 오른쪽으로 얼마나 떨여져 있는지를 나타냄*/ 

slider.addEventListener('mouseenter', () => {
    slider.style.cursor = "grab" /*grab은 잡을 수 있음을 표현하는 모양의 커서*/
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
    /*getBoundingClientRect() 메소드를 사용하면 해당 요소의 모든 좌푯값을 받을 수 있음*/

    if(parseInt(innerslider.style.left) > 0) {
        innerslider.style.left = '0px';
    } else if (inner.right < outer.right) {
        innerslider.style.left = `-${inner.width - outer.width}px`
    }
    /*innerslider.style.left는 innerslider가 브라우저에서 왼족으로 얼마나 떨어져 있는가, position:absolute가 적용되어
    브라우저를 relative 삼고 위치를 반환한다고 생각하면 됨
    parseInt()는 정수로 반환해주는 함수
    innerslider.style.left 값을 측정하여 0보다 클 경우에 left 값을 초기화 해주기 위함
    즉 slider가 오른쪽으로도 drag 될 수 있는 것을 막아주기 위함
    inner.right < outer.right 는 이미지들이 다 slider 안으로 들어왔을 때, 
    즉 마지막 이미지가 slider 안에 들어왔을 때를 말함*/
}
/*checkBoundary() 함수는 slider의 시작점과 끝점을 체크해서 boundary가 초과하지 않도록 해주는 함수*/

slider.addEventListener('mousemove', e => {
    if(!pressed) return 
    e.preventDefault();
    x = e.offsetX;

    innerslider.style.left = `${x - startX}px`;
    checkBoundary();
})
/*drag를 처리하는 이벤트로, preventDefault() 는 현재 이벤트의 기본 동작을 중단시키는 함수 
이 이벤트가 실행되는 즉시 위에서 만든 checkboundary() 함수를 호출하여 영역 내부 처리가 맞는지 확인해줌*/

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
