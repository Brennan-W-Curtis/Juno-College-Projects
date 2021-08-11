// Create a Namespace Object to store all properties and methods.
let app = {};

// Create a Namespace property to hold film recommendation API key.
app.filmApiKey = `421294-filmPars-Q3BQMFSA`;

// Create a Namespace property to hold film information API key.
app.posterApiKey = `ee6ba4c3f6e4ce706ed01f8438913318`;

// Retrieve film recommendations based upon the user's input.
app.getFilms = query => {
    $.ajax({
        url: "https://tastedive.com/api/similar",
        method: "GET",
        dataType: "jsonp",
        data: {
            q: query,
            type: "movies",
            info: 1,
            limit: 16,
            k: app.filmApiKey
        }
    }).then(res => {
        $(".recommended-films").empty();
        $(".input-film").empty();
        app.getQueryPoster(res.Similar.Info[0].Name.toString());
        const similarFilms = res.Similar.Results.map(item => item.Name);
        similarFilms.forEach(film => app.getRecommendedPosters(film));
    });
};

// Retrieve film information based upon the input received by the getFilms method.
app.getQueryPoster = query => {
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie",
        method: "GET",
        dataType: "json",
        data: {
            api_key: app.posterApiKey,
            query: query
        }
    }).then(res => {
        const filteredResults = res.results.filter(item => item.vote_count >= 1000);
        app.displayQueryImage(filteredResults);
    })
};

// Retrieve film information based upon the films recommended by the getFilms method.
app.getRecommendedPosters = query => {
    let films = [];
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie",
        method: "GET",
        dataType: "json",
        data: {
            api_key: app.posterApiKey,
            query: query
        }
    }).then(res => {
        films.push(query);
        const filteredResults = res.results.filter(item => item.vote_count >= 1000 && item.title === films[0]);
        app.displayRecommendedImages(filteredResults);
    });
};

// Displays the poster of the query film input by the user. 
app.displayQueryImage = poster => {
    const baseUrl = "http://image.tmdb.org/t/p/";
    const posterSize = "w780";
    const posterHtml = `
        <div class="query-film>
            <div class="query-poster>
                <img src="${baseUrl}${posterSize}${poster[0].poster_path}" alt="${poster[0].original_title}">
            </div>
            <p class="film-title">${poster[0].original_title} (${poster[0].release_date.slice(0, 4)})</p>
        </div>
    `;    
    $(".input-film").append(posterHtml);
};
    
// Displays the posters of the recommended films for the user to review.
app.displayRecommendedImages = posters => {
    const baseUrl = "http://image.tmdb.org/t/p/";
    const posterSize = "w780";
    posters.forEach(poster => {
        const posterHtml = `
            <div class="recommended-film">
                <div class="poster-container">
                    <img src="${baseUrl}${posterSize}${poster.poster_path}" alt="${poster.original_title} class="recommended-poster">
                </div>
                <p class="film-title">${poster.original_title} (${poster.release_date.slice(0, 4)})</p>
            </div>
        `;
        $(".recommended-films").append(posterHtml);
    });
};

// Initialize the App.
app.init = () => {
    $("form").on("submit", event => {
        event.preventDefault();
        const searchTerm = $("#search-query").val();
        app.getFilms(searchTerm);
    });
};

// Ready document.
$(document).ready(() => {
    app.init();
});