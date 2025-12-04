const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");



const APILINK = 'http://localhost:8000/api/v1/reviews/';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=54b385dd18483ef359c18c8552a67a63&query=';

const main = document.getElementById('section');
const title = document.getElementById('title');

title.innerText = movieTitle;


returnMovies(APILINK)
function returnMovies(url){
    fetch(url + "movie/" + movieId).then(res =>res.json())
    .then(function(data){
        console.log(data);
        data.forEach(review  => {
            const div_card = document.createElement('div');
            div_card.innerHTML = 
                `<div class="row">
                    <div class="column">
                        <div class="card" id="${review._id}">
                            <p><strong>Review: </strong>${review.review}</p>
                            <p><strong>User: </strong>${review.user}</p>
                            <p><a href="#" onclick="editReview('${review._id}', '${review.review}','${review.user}' ) ">edit</a><a href="#" onclick="deleteReview('${review._id}' )">delete</a></p>
                        </div>
                    </div>
                </div>
                `;

            main.appendChild(div_card);

        }); 
    });
}
