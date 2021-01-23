var positionGifs;
const closedModal = document.querySelector(".modal__close");
const nextModal = document.getElementById("modal-next");
const backModal = document.getElementById("modal-back");
const likeModal = document.querySelector(".modal__media--like");
const downloadModal = document.querySelector(".modal__media--download");

closedModal.addEventListener("click", closeModalGif);
nextModal.addEventListener("click", nextModalGif);
backModal.addEventListener("click", backMoadalGif);
likeModal.childNodes[1].addEventListener("click", likeModalGif);
downloadModal.childNodes[1].addEventListener("click", downloadModalGif);

function closeModalGif(event) {
  let overlay = document.querySelector(".overlay");
  overlay.style.animation = "modalOut .9s forwards";
  setTimeout(function (params) {
    document.getElementById("modal-like").classList.remove("fas");
    document.getElementById("modal-like").classList.remove("far");
  }, 1000);
}

function nextModalGif(event) {
  let imgMOdalId = document.querySelector("#image-modal").dataset.id;
  if (swSearch) {
    positionGifs = localDataSearch.findIndex((e) => e.id === imgMOdalId);
    nextGif(localDataSearch);
  } else if (swTrending) {
    positionGifs = localTrendingGifs.findIndex((e) => e.id === imgMOdalId);
    nextGif(localTrendingGifs);
  } else if (swFavorites) {
    let tempFavorites = JSON.parse(localStorage.getItem("favorites"));
    positionGifs = tempFavorites.findIndex((e) => e.id === imgMOdalId);
    nextGif(tempFavorites);
  } else {
    let tempmyGifs = JSON.parse(localStorage.getItem("myGifs"));
    positionGifs = tempmyGifs.findIndex((e) => e.id === imgMOdalId);
    nextGif(tempmyGifs);
  }
}

function backMoadalGif(event) {
  let imgMOdalId = document.querySelector("#image-modal").dataset.id;
  if (swSearch) {
    positionGifs = localDataSearch.findIndex((e) => e.id === imgMOdalId);
    backGif(localDataSearch);
  } else if (swTrending) {
    positionGifs = localTrendingGifs.findIndex((e) => e.id === imgMOdalId);
    backGif(localTrendingGifs);
  } else if (swFavorites) {
    let tempFavorites = JSON.parse(localStorage.getItem("favorites"));
    positionGifs = tempFavorites.findIndex((e) => e.id === imgMOdalId);

    backGif(tempFavorites);
  } else {
    let tempmyGifs = JSON.parse(localStorage.getItem("myGifs"));
    positionGifs = tempmyGifs.findIndex((e) => e.id === imgMOdalId);

    backGif(tempmyGifs);
  }
}

function nextGif(gifs) {
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let modalLike = document.getElementById("modal-like");
  if (positionGifs < gifs.length && gifs.length > positionGifs + 1) {
    positionGifs++;
    imgModal.dataset.id = `${gifs[positionGifs].id}`;
    imgModal.src =
      swFavorites || swMyGifs
        ? `${gifs[positionGifs].url}`
        : `${gifs[positionGifs].images.original.url}`;
    user.innerHTML =
      swFavorites || swMyGifs
        ? `${gifs[positionGifs].user}`
        : `${gifs[positionGifs].username}`;
    title.innerHTML = `${gifs[positionGifs].title}`;
    modalLike.classList.remove("fas");
    modalLike.classList.remove("far");
    let myGifs = [];
    myGifs = JSON.parse(localStorage.getItem("favorites"));
    let indexMyGifs = myGifs.findIndex(
      (data) => data.id === gifs[positionGifs].id
    );
    if (indexMyGifs == -1) {
      modalLike.classList.toggle("far");
    } else {
      modalLike.classList.toggle("fas");
    }
  }
}

function backGif(gifs) {

  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let modalLike = document.getElementById("modal-like");

  if (positionGifs > 0) {
    positionGifs--;
    imgModal.dataset.id = `${gifs[positionGifs].id}`;
    imgModal.src =
      swFavorites || swMyGifs
        ? `${gifs[positionGifs].url}`
        : `${gifs[positionGifs].images.original.url}`;
    user.innerHTML =
      swFavorites || swMyGifs
        ? `${gifs[positionGifs].user}`
        : `${gifs[positionGifs].username}`;
    title.innerHTML = `${gifs[positionGifs].title}`;
    modalLike.classList.remove("fas");
    modalLike.classList.remove("far");
    let myGifs = [];
    myGifs = JSON.parse(localStorage.getItem("favorites"));
    let indexMyGifs = myGifs.findIndex(
      (data) => data.id === gifs[positionGifs].id
    );
    if (indexMyGifs == -1) {
      modalLike.classList.toggle("far");
    } else {
      modalLike.classList.toggle("fas");
    }
  }
}

function likeModalGif(event) {
  let tempGif = [];
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let id = imgModal.dataset.id;
  tempGif.push({
    id: imgModal.dataset.id,
    url: imgModal.src,
    title: user.textContent,
    user: title.textContent,
  });
  if (swFavorites) {
    validateMyFavoriteGifs(event.target.classList, tempGif, id);
  }
  favoriteGif(id, tempGif, event);
}

function downloadModalGif(event) {
  let imgModal = document.getElementById("image-modal");
  let url = imgModal.src;
  downloadGif(url);
}
