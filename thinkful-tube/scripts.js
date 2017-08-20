const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY = "AIzaSyCDJlkF9sKY73Fl6C5UvNFikSVLv5-2ZN8";

function getDataFromApi(searchTerm, callback) {
  const query = {
    maxResults: 12,
    part: "snippet",
    q: searchTerm,
    key: YOUTUBE_API_KEY
  }
  const result = $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  const thumbnail = result.snippet.thumbnails.medium.url;
  const title = result.snippet.title;
  const id = result.id.videoId;
  const url = `https://www.youtube.com/watch?v=${id}`;
  
  return `
    <li class="search-results__item">
      <a class="search-results__link" href="${url}" target="_blank">
        <img class="search-results__thumbnail" src="${thumbnail}" />
        <h2 class="search-results__title">${title}</h2>
      </a>
    </li>
  `;
}

function displayYouTubeSearchData(data) {
  const resultsContainer = $(".js-search-results");
  
  resultsContainer.empty();
  data.items.forEach(function(item) {
    resultsContainer.append(renderResult(item));
  });
}

function clearInput(input) {
  input.val("");
}

function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find(".js-search-input");
    const query = queryTarget.val();

    clearInput(queryTarget);
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);