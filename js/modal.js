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
  if (swSearch) {
    nextGif(localDataSearch);
  } else if (swTrending) {
    nextGif(localTrendingGifs);
  } else {
  }
}

function nextGif(gifs) {
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let modalLike = document.getElementById("modal-like");
  if (positionGifs < gifs.length) {
    positionGifs++;
    imgModal.dataset.id = `${gifs[positionGifs].id}`;
    imgModal.src = `${gifs[positionGifs].images.original.url}`;
    user.innerHTML = `${gifs[positionGifs].username}`;
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

function backMoadalGif(event) {
  if (swSearch) {
    nextGif(localDataSearch);
  } else if (swTrending) {
    nextGif(localTrendingGifs);
  } else {
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
    imgModal.src = `${gifs[positionGifs].images.original.url}`;
    user.innerHTML = `${gifs[positionGifs].username}`;
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
  // event.target.classList.toggle("fas");
  let tempGif = [];
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector(".modal__information--user");
  let title = document.querySelector(".modal__information--title");
  let id = imgModal.dataset.id;
  debugger;
  tempGif.push({
    id: imgModal.dataset.id,
    url: imgModal.src,
    title: user.textContent,
    user: title.textContent,
  });
  console.log(tempGif);
  favoriteGif(id, tempGif, event);
}

function downloadModalGif(event) {
  let imgModal = document.getElementById("image-modal");
  let url = imgModal.src;
  downloadGif(url);
}
