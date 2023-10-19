const api_key = "2068f3f14bd1466aab0798a628dd4047";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", fetchnews("pakistan"));



async function fetchnews(query) {
  const res = await fetch(`${url} ${query} &apikey=${api_key}`);
  const data = await res.json();
  //function declaration
  bindData(data.articles); //only call at this point of fetching news
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";
  articles.forEach((element) => {
    if (!element.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, element); //panga
    cardsContainer.appendChild(cardClone);
  });
}

//now initialoize the function

function fillDataInCard(cardClone, element) {
  //panga
  const newsimg = cardClone.getElementById("news-img");
  const newsTitle = cardClone.getElementById("news-title");
  const newsSource = cardClone.getElementById("news-source");
  const newsDesc = cardClone.getElementById("news-desc");

  newsimg.src = element.urlToImage;
  newsTitle.innerHTML = element.title;
  newsDesc.innerHTML = element.description;
  newsSource.innerHTML = element.source.name;
  //for  another page redirect on news click
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(element.url, "_blank");
  });
}

// for different news related to navbar
function onNavItemClick(id) {
  fetchnews(id);
}

//for proper searching with button
const searchbtn = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchbtn.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchnews(query);
});

// for loading the whole page
function reload() {
  window.location.reload();
}



