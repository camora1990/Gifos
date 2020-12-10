var positionGifs;
const closedModal = document.querySelector('.modal__close')
const nextModal = document.getElementById('modal-next')
const backModal = document.getElementById('modal-back')
const likeModal = document.querySelector('.modal__media--like')
const downloadModal = document.querySelector('.modal__media--download')

closedModal.addEventListener('click', closeModalGif)
nextModal.addEventListener('click', nextModalGif)
backModal.addEventListener('click', backMoadalGif)
likeModal.childNodes[1].addEventListener('click', likeModalGif)
downloadModal.childNodes[1].addEventListener('click', downloadModalGif)


function closeModalGif(event) {
  let overlay = document.querySelector('.overlay')
  overlay.style.animation = "modalOut .9s forwards";
}

function nextModalGif(event) {
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector('.modal__information--user')
  let title = document.querySelector('.modal__information--title')
  if (positionGifs < localTrendingGifs.length) {
    positionGifs++
    imgModal.src = `${localTrendingGifs[positionGifs].images.original.url}`;
    user.innerHTML = `${localTrendingGifs[positionGifs].username}`
    title.innerHTML = `${localTrendingGifs[positionGifs].title}`
  }
}

function backMoadalGif(event) {
  let imgModal = document.getElementById("image-modal");
  let user = document.querySelector('.modal__information--user')
  let title = document.querySelector('.modal__information--title')
  if (positionGifs > 0) {
    positionGifs--
    imgModal.src = `${localTrendingGifs[positionGifs].images.original.url}`;
    user.innerHTML = `${localTrendingGifs[positionGifs].username}`
    title.innerHTML = `${localTrendingGifs[positionGifs].title}`

  }
}


function likeModalGif(event) {
  event.target.classList.toggle("fas");
}


function downloadModalGif(event) {
  let imgModal = document.getElementById("image-modal");
  let url = imgModal.src
  downloadGif(url)
}