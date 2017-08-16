const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY = "AIzaSyCDJlkF9sKY73Fl6C5UvNFikSVLv5-2ZN8";

function getDataFromApi(searchTerm, callback) {
  const query = {
    maxResults: 10,
    part: "snippet",
    q: "`${searchTerm}`",
    key: YOUTUBE_API_KEY
  }
  const result = $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <h2>${result}</h2>
  `;
}

function displayYouTubeSearchData(data) {
  data.items.forEach(function(item) {
    const title = item.snippet.title;
    console.log(title);
  });
}

function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find(".js-search-input");
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);