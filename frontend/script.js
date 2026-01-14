
const API = "http://localhost:3000/movies";
const list = document.getElementById("movieList");
const form = document.getElementById("movieForm");
const modal = new bootstrap.Modal(document.getElementById("messageModal"));
const modalText = document.getElementById("modalText");

function showMessage(message) {
    modalText.textContent = message;
    modal.show();
}

function loadMovies() {
    fetch(API)
    .then(res => res.json())
    .then(data => {
        list.innerHTML = "";
        data.forEach(movie =>  {
            const color = movie.rating >= 8 ? "success" : "secondary";


            list.innerHTML += `
            <div class ="col-md-4 mb-3">
            <div class ="card border-${color}">
            <div class ="card-body">
            <h5>${movie.title}</h5>
            <p>${movie.year} - Betyg ${movie.rating}</p>

            <button class="btn btn-warning btn-sm me-2" onclick="editMovie(${movie.id},'${movie.title}','${movie.year}','${movie.rating}')">Ändra</button>
            <button class="btn btn-danger btn-sm" onclick="deleteMovie(${movie.id})">Ta bort</button>
            </div>
            </div>
            </div>
            `;
        });
    });

}

form.addEventListener("submit", e => {
    e.preventDefault();


    const id = document.getElementById("movieId").value;
    const movie = {
        title: title.value,
        year: year.value,
        rating: rating.value,
        id:id   
    };


    const method = id ? "PUT" : "POST";

    fetch(API, { 
        method,
        headers : { "Content-Type" : "application/json"},
        body: JSON.stringify(movie)
    }).then(() => {
        showMessage(id ? "Film uppdaterad" : "Film skapad");
        form.reset();
        movieId.value = "";
        loadMovies();
    
    });
});


function editMovie (id, titleVal, yearVal, ratingVal) {
    movieId.value = id;
    title.value = titleVal;
     year.value = yearVal;
    rating.value = ratingVal;

    }

    function deleteMovie (id) {
        fetch(`${API}/${id}`, {method: "DELETE"})
        .then(() => {
            showMessage("Film borttagen");
            loadMovies();
        });
    }

    loadMovies();