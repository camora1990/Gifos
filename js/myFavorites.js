const favoritesMenu = document.getElementById("favorites");
const containerFavoriteGifs = document.querySelector(".my-favorities__result");
const myFavoritesEmpty = document.querySelector(".my-favorities__empty");
const seeMoreFavorites = document.getElementById("see-more-favorities");
swFavorites = true;
var favoriteGifs = JSON.parse(localStorage.getItem("favorites"));

favoritesMenu.style.color = "#9CAFC3";

if (favoriteGifs.length > 0) {
  myFavoritesEmpty.style.display = "none";
  containerFavoriteGifs.classList.remove("hidden");
  favoriteGifs.forEach((element) => {
    containerFavoriteGifs.innerHTML += createTemplateFavoriteGifs(element);
  });
} else {
  myFavoritesEmpty.style.display = "block";
  containerFavoriteGifs.classList.add("hidden");
}

function createTemplateFavoriteGifs(gifs) {
  return `<div class="my-favorities__result--item" data-id="${gifs.id}" onclick="favoritiesExpandMobile(event)" onmouseenter="favoritiesMouseOver(event)" onmouseleave="favoritiesMouseLeave(event)">
    <div class="my-favorities__result--item--selected"></div>
    <div class="my-favorities__result--item--like" onmouseenter="preferencefavoritiesMouseOver(event)" onmouseleave="preferencefavoritiesMouseLeave(event)" >
      <i class="fas fa-heart" onclick="favoritiesLike(event)"></i>
    </div>
    <div class="my-favorities__result--item--download" onmouseenter="preferencefavoritiesMouseOver(event)" onmouseleave="preferencefavoritiesMouseLeave(event)"><i class="fas fa-download" onclick="favoritiesDownload(event)"></i>
    </div>
    <div class="my-favorities__result--item--expand" onmouseenter="preferencefavoritiesMouseOver(event)" onmouseleave="preferencefavoritiesMouseLeave(event)" >
      <i class="fas fa-expand-alt" onclick="favoritiesExpand(event)"></i>
    </div>
   <img
      src="${gifs.url}"
      alt="${gifs.title}"
    />
    <div class="my-favorities__result--item--gif-title">
      <span class="favorities--title">${gifs.title}</span>
    </div>
  </div>`;
}

function favoritiesExpandMobile(event) {
  swTrending = false;
  swSearch = false;
  swFavorites = true;
  let overlay = document.querySelector(".overlay");
  let idImg = event.path[1].dataset.id;
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let myGifs = [];

  myGifs = JSON.parse(localStorage.getItem("favorites"));
  let tempMyGifs = myGifs;
  positionGifs = myGifs.findIndex((element) => element.id === idImg);
  imgModal.src = `${myGifs[positionGifs].url}`;
  imgModal.dataset.id = `${myGifs[positionGifs].id}`;
  user.innerHTML = `${myGifs[positionGifs].username}`;
  title.innerHTML = `${myGifs[positionGifs].title}`;

  let indexMyGifs = myGifs.findIndex(
    (data) => data.id === tempMyGifs[positionGifs].id
  );
  let clasIcon = indexMyGifs == -1 ? "far" : "fas";
  document.getElementById("modal-like").classList.add(clasIcon);
  overlay.style.display = "flex";
  overlay.style.animation = "modalIn .8s forwards";
}

function favoritiesMouseOver(event) {
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

function favoritiesMouseLeave(event) {
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

function preferencefavoritiesMouseOver(event) {
  event.target.style.opacity = "1";
}
function preferencefavoritiesMouseLeave(event) {
  if (!event.target.children[0].classList.contains("fas")) {
    event.target.style.opacity = "0.7";
  } else if (!event.target.classList.contains("like")) {
    event.target.style.opacity = "0.7";
  }
}

function favoritiesLike(event) {
  let temFavoriteGifs = JSON.parse(localStorage.getItem("favorites"));
  if (temFavoriteGifs.length == 1) {
    seeMoreFavorites.classList.add("hidden");
    myFavoritesEmpty.style.display = "block";
    containerFavoriteGifs.classList.add("hidden");
  } else {
    seeMoreFavorites.classList.remove("hidden");
    myFavoritesEmpty.style.display = "none";
    containerFavoriteGifs.classList.remove("hidden");
  }
  let id = event.target.parentNode.parentNode.dataset.id;
  let temfavoriteGifs = JSON.parse(localStorage.getItem("favorites"));
  let temIndextemfavoriteGifs = temfavoriteGifs.findIndex(
    (data) => data.id === id
  );
  containerFavoriteGifs.children[temIndextemfavoriteGifs].remove();
  temfavoriteGifs.splice(temIndextemfavoriteGifs, 1);
  localStorage.setItem("favorites", JSON.stringify(temfavoriteGifs));
}

function favoritiesDownload(event) {
  let url =
    event.target.parentNode.parentElement.childNodes[9].attributes.src.value;
  //called of globals
  downloadGif(url);
}

function favoritiesExpand(event) {
  swTrending = false;
  swSearch = false;
  swFavorites = true;
  let overlay = document.querySelector(".overlay");
  let idImg = event.target.parentNode.parentElement.dataset.id;
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let myGifs = [];

  myGifs = JSON.parse(localStorage.getItem("favorites"));
  let tempMyGifs = myGifs;
  positionGifs = myGifs.findIndex((element) => element.id === idImg);
  imgModal.src = `${myGifs[positionGifs].url}`;
  imgModal.dataset.id = `${myGifs[positionGifs].id}`;
  user.innerHTML = `${myGifs[positionGifs].username}`;
  title.innerHTML = `${myGifs[positionGifs].title}`;

  let indexMyGifs = myGifs.findIndex(
    (data) => data.id === tempMyGifs[positionGifs].id
  );
  let clasIcon = indexMyGifs == -1 ? "far" : "fas";
  document.getElementById("modal-like").classList.add(clasIcon);
  overlay.style.display = "flex";
  overlay.style.animation = "modalIn .8s forwards";
}

function validateMyFavoriteGifs(classLike, gif, id) {
  let temFavoriteGifs = JSON.parse(localStorage.getItem("favorites"));
  if (temFavoriteGifs.length == 1 && classLike.contains("fas")) {
    seeMoreFavorites.classList.add("hidden");
    myFavoritesEmpty.style.display = "block";
    containerFavoriteGifs.classList.add("hidden");
  } else {
    seeMoreFavorites.classList.remove("hidden");
    myFavoritesEmpty.style.display = "none";
    containerFavoriteGifs.classList.remove("hidden");
  }

  if (classLike.contains("far")) {
    containerFavoriteGifs.innerHTML += createTemplateFavoriteGifs(gif[0]);
  } else if (swFavorites && classLike.contains("fas")) {
    let temfavoriteGifs = JSON.parse(localStorage.getItem("favorites"));
    let temIndextemfavoriteGifs = temfavoriteGifs.findIndex(
      (data) => data.id === id
    );
    containerFavoriteGifs.children[temIndextemfavoriteGifs].remove();
  }
}
