const search = document.getElementById("search");
const iconSearch = document.getElementById("icon-search");
const clearSearch = document.getElementById("clear-search");
const iconLeftSearch = document.querySelector(".icon-left");
const suggestions = document.getElementById("suggestions");
const urlApiSugestion = "https://api.giphy.com/v1/tags/related/";
const urlApiSearch = "https://api.giphy.com/v1/gifs/search";
const seeMore = document.getElementById("see-more");
const itemsSugestion = document.querySelectorAll("#suggestions span")
var localDataSearch;
var paginacion = 0;

search.addEventListener("input", searchInput);
search.addEventListener("keypress", searchEnter);
seeMore.addEventListener("click", seeMoreGifs);

for (let index = 0; index < suggestions.children.length; index++) {
  suggestions.children[index].addEventListener("click", selectSugestion);
}

function searchInput(event) {
  let marginSearch = document.querySelector(".main__search--margin");
  if (event.target.value.length >= 1) {
    clearSearch.classList.remove("hidden");
    iconSearch.classList.add("hidden");
    clearSearch.addEventListener("click", clearInput);
    iconLeftSearch.style.display = "flex";
    suggestions.classList.remove("hidden");
    marginSearch.classList.remove("hidden");
    document.querySelector(".main p").style.display = "none";
    document.querySelector(".search-result__title").innerHTML =
      event.target.value;
    suggestionResult(event);
  } else {
    clearSearch.classList.add("hidden");
    iconSearch.classList.remove("hidden");
    iconLeftSearch.style.display = "none";
    suggestions.classList.add("hidden");
    marginSearch.classList.add("hidden");
    document.querySelector(".main p").style.display = "block";
    document.querySelector(".search-result__title").innerHTML = "";
  }
}

function clearInput(event) {
  let marginSearch = document.querySelector(".main__search--margin");
  search.value = "";
  clearSearch.classList.toggle("hidden");
  iconSearch.classList.toggle("hidden");
  iconLeftSearch.style.display = "none";
  clearSearch.classList.add("hidden");
  marginSearch.classList.add("hidden");
  suggestions.classList.add("hidden");
  document.querySelector(".main p").style.display = "block";
}

async function suggestionResult(event) {
  let url = `${urlApiSugestion}{${event.target.value}}?`;
  var result = await getData(url, api_key);
  suggestions.children[0].children[1].innerHTML = result.data[0].name;
  suggestions.children[1].children[1].innerHTML = result.data[1].name;
  suggestions.children[2].children[1].innerHTML = result.data[2].name;
  suggestions.children[3].children[1].innerHTML = result.data[3].name;
}

function selectSugestion(event) {
 
  console.log(event)
  let searchResul = document.querySelector(".search-result");
  searchResul.style.display = "block";
  let marginSearch = document.querySelector(".main__search--margin");
  let result = event.target.localName!="span" || event.target.localName!="i" ?event.target.parentNode.children[1].innerText:event.target.children[1].innerText
  search.value = result
  document.querySelector(".search-result__title").innerHTML =
  result;
  suggestions.classList.toggle("hidden");
  marginSearch.classList.toggle("hidden");
  searchGifs(search.value);
}

function searchEnter(event) {
  let searchResul = document.querySelector(".search-result");

  let marginSearch = document.querySelector(".main__search--margin");
  if (event.key == "Enter") {
    searchResul.style.display = "block";
    suggestions.classList.toggle("hidden");
    marginSearch.classList.toggle("hidden");
    searchGifs(event.target.value);
    seeMore.style.display = 'none'
  }
}

function createTemplateSearchGifs(gifs) {
  let myGifs = JSON.parse(localStorage.getItem("favorites"));
  let indexMyGifs = myGifs.findIndex((data) => data.id === gifs.id);
  let icon = indexMyGifs == -1 ? "far" : "fas";
  return `<div class="search-result__successful--item" data-id="${gifs.id}" onclick="searchExpandMobile(event)" onmouseenter="searchMouseOver(event)" onmouseleave="searchMouseLeave(event)">
              <div class="search-result__successful--item--selected"></div>
              <div class="search-result__successful--item--like" onmouseenter="preferenceSearchMouseOver(event)" onmouseleave="preferenceSearchMouseLeave(event)" >
                <i class="${icon} fa-heart" onclick="searchLike(event)"></i>
              </div>
              <div class="search-result__successful--item--download" onmouseenter="preferenceSearchMouseOver(event)" onmouseleave="preferenceSearchMouseLeave(event)"><i class="fas fa-download" onclick="searchDownload(event)"></i>
              </div>
              <div class="search-result__successful--item--expand" onmouseenter="preferenceSearchMouseOver(event)" onmouseleave="preferenceSearchMouseLeave(event)" >
                <i class="fas fa-expand-alt" onclick="searchExpand(event)"></i>
              </div>
             <img
                src="${gifs.images.original.url}"
                alt="${gifs.title}"
              />
              <div class="search-result__successful--item--gif-title">
                <span class="search--user">${gifs.username}</span>
                <span class="search--title">${gifs.title}</span>
              </div>
          </div>`;
}

async function searchGifs(value) {
  let containeSearch = document.querySelector(".search-result__successful");
  let containeSearchWrong = document.querySelector(".search-result__wrong");
  var n = containeSearch.children.length;
  if (containeSearch.children.length > 0) {
    for (let index = 0; index < n; index++) {
      containeSearch.removeChild(containeSearch.children[0]);
    }
  }
  paginacion = 0;
  localDataSearch = [];
  let url = `${urlApiSearch}?q=${value}&`;
  console.log(url);
  var dataSearch = await getData(url, api_key);
  localDataSearch = dataSearch.data;
  if (localDataSearch.length > 0) {
    addSearchGif(dataSearch.data);
    containeSearch.classList.remove("hidden");
    containeSearchWrong.classList.add("hidden");
  } else {
    containeSearch.classList.add("hidden");
    containeSearchWrong.classList.remove("hidden");
    seeMore.classList.add('hidden')
  }
  document.querySelector(".main p").style.display = "block";
}

function addSearchGif(gifs) {
  let containeSearch = document.querySelector(".search-result__successful");
  for (let index = paginacion; index < gifs.length; index++) {
    if ((index + 1) % 12 == 0) {
      paginacion = index + 1;
      containeSearch.innerHTML += createTemplateSearchGifs(gifs[index]);
      if (paginacion < gifs.length) {
        seeMore.style.display = "block";
      } else {
        seeMore.style.display = "none";
      }
      return;
    } else {
      containeSearch.innerHTML += createTemplateSearchGifs(gifs[index]);
    }
  }
  if (gifs.length == containeSearch.children.length) {
    seeMore.style.display = "none";
  } else {
    seeMore.style.display = "block";
  }
}

function searchMouseOver(event) {
  event.target.childNodes[1].style.display = "block";
  event.target.childNodes[3].style.display = "flex";
  event.target.childNodes[3].childNodes[1].classList.remove("fas");
  event.target.childNodes[3].childNodes[1].classList.remove("far");

  let myGifs = JSON.parse(localStorage.getItem("favorites"));
  let indexMyGifs = myGifs.findIndex(
    (data) => data.id === event.target.dataset.id
  );
  let clasIcon = indexMyGifs == -1 ? "far" : "fas";
  event.target.childNodes[3].childNodes[1].classList.add(clasIcon);

  if (event.target.childNodes[3].childNodes[1].classList.contains("fas")) {
    event.target.childNodes[3].style.opacity = "1";
  } else {
    event.target.childNodes[3].style.opacity = "0.7";
  }
  event.target.childNodes[5].style.display = "flex";
  event.target.childNodes[7].style.display = "flex";
  event.target.childNodes[11].style.display = "block";
}

function searchMouseLeave(event) {
  event.target.childNodes[1].style.display = "none";
  event.target.childNodes[3].style.display = "none";
  if (event.target.childNodes[3].childNodes[1].classList.contains("fas")) {
    event.target.childNodes[3].style.opacity = "1";
  } else {
    event.target.childNodes[3].style.opacity = "0.7";
  }
  event.target.childNodes[5].style.display = "none";
  event.target.childNodes[7].style.display = "none";
  event.target.childNodes[11].style.display = "none";
}

function preferenceSearchMouseOver(event) {
  event.target.style.opacity = "1";
}

function preferenceSearchMouseLeave(event) {
  if (!event.target.children[0].classList.contains("fas")) {
    event.target.style.opacity = "0.7";
  } else if (!event.target.classList.contains("searchLike")) {
    event.target.style.opacity = "0.7";
  }
}

function searchLike(event) {
  let id = event.target.parentNode.parentElement.dataset.id;
  let tempGif = localDataSearch.find((data) => data.id === id);
  let gif = [
    {
      id: tempGif.id,
      url: tempGif.images.original.url,
      title: tempGif.title,
      user: tempGif.username,
    },
  ];
  favoriteGif(id, gif, event);
}

function searchDownload(event) {
  let url =
    event.target.parentNode.parentElement.childNodes[9].attributes.src.value;
  downloadGif(url);
}

function searchExpand(event) {
  swTrending = false;
  swSearch = true;
  swMyGifs = false;
  swFavorites = false;
  let overlay = document.querySelector(".overlay");
  let idImg = event.target.parentNode.parentElement.dataset.id;
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let myGifs = [];

  myGifs = JSON.parse(localStorage.getItem("favorites"));
  positionGifs = localDataSearch.findIndex((element) => element.id === idImg);
  imgModal.src = `${localDataSearch[positionGifs].images.original.url}`;
  imgModal.dataset.id = `${localDataSearch[positionGifs].id}`;
  user.innerHTML = `${localDataSearch[positionGifs].username}`;
  title.innerHTML = `${localDataSearch[positionGifs].title}`;

  let indexMyGifs = myGifs.findIndex(
    (data) => data.id === localDataSearch[positionGifs].id
  );
  let clasIcon = indexMyGifs == -1 ? "far" : "fas";
  document.getElementById("modal-like").classList.add(clasIcon);
  overlay.style.display = "flex";
  overlay.style.animation = "modalIn .8s forwards";
}


function searchExpandMobile(event) {
  console.log(event)
  swTrending = false;
  swSearch = true;
  let overlay = document.querySelector(".overlay");
  let idImg = event.path[1].dataset.id;
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let myGifs = [];

  myGifs = JSON.parse(localStorage.getItem("favorites"));
  positionGifs = localDataSearch.findIndex((element) => element.id === idImg);
  imgModal.src = `${localDataSearch[positionGifs].images.original.url}`;
  imgModal.dataset.id = `${localDataSearch[positionGifs].id}`;
  user.innerHTML = `${localDataSearch[positionGifs].username}`;
  title.innerHTML = `${localDataSearch[positionGifs].title}`;

  let indexMyGifs = myGifs.findIndex(
    (data) => data.id === localDataSearch[positionGifs].id
  );
  let clasIcon = indexMyGifs == -1 ? "far" : "fas";
  document.getElementById("modal-like").classList.add(clasIcon);
  overlay.style.display = "flex";
  overlay.style.animation = "modalIn .8s forwards";
}

function seeMoreGifs(event) {
  addSearchGif(localDataSearch)
}
