//Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  //If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //If movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="star-icon.png">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            
        `;
        }
        //If movie does NOT exists in database
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      //If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};


let genreSelect = document.getElementById("genre-select");

// Function to fetch and display trending movies by selected genre
let updateTrendingMovies = () => {
  let selectedGenre = genreSelect.value;
  let trendingResults = document.getElementById("trending-results");

  let trendingUrl = `http://www.omdbapi.com/?s=${selectedGenre}&type=movie&apikey=${key}`;

  fetch(trendingUrl)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.Response == "True" && data.Search) {
        let trendingMovies = data.Search.slice(0, 5);
        let trendingHTML = trendingMovies.map((movie) => {
          return `
            <div class="trending-movie">
              <img src=${movie.Poster} alt="${movie.Title}">
              <p>${movie.Title}</p>
            </div>
          `;
        }).join("");

        trendingResults.innerHTML = trendingHTML;
      } else {
        trendingResults.innerHTML = `<p class="msg">No trending movies found.</p>`;
      }
    })
    .catch(() => {
      trendingResults.innerHTML = `<p class="msg">Error occurred while fetching trending movies.</p>`;
    });
};

// Add an event listener to the genre select dropdown
genreSelect.addEventListener("change", updateTrendingMovies);

// Call the function initially
updateTrendingMovies();



searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);









