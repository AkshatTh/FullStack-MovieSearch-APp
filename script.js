const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=54b385dd18483ef359c18c8552a67a63&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=54b385dd18483ef359c18c8552a67a63&query=';

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');


returnMovies(APILINK)
function returnMovies(url){
    fetch(url).then(res =>res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');
            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');
            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');
            const title = document.createElement('h3');
            title.setAttribute('id' , 'title');

            const center = document.createElement('center');


            title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`;
            image.src = IMG_PATH + element.poster_path;

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
            main.appendChild(div_row);

        }); 
    });
}

function debounce(func, delay) {
    let timeoutId;
    

    return function(...args) { 
        clearTimeout(timeoutId); 
        

        timeoutId = setTimeout(() => {

            func.apply(this, args); 
        }, delay);
    };
}


const searchLogic = (searchItem) => {
    main.innerHTML = ''; 

    if(searchItem) {

        returnMovies(SEARCHAPI + searchItem);
    } else {
        returnMovies(APILINK);
    }
};


const debouncedSearch = debounce(searchLogic, 300);

form.addEventListener("input" , (e) => {
    const searchItem = search.value;
    
    debouncedSearch(searchItem); 
});

form.addEventListener("submit" , (e) => {
    e.preventDefault();
    search.value = '';

});