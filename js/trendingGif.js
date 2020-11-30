const urlApy = "https://api.giphy.com/v1/gifs/trending";
const api_key = "vhJ8PRnNPlfioc3JHjAskmPh3GdPK2J1";
const trendingGifos = document.querySelector(".trending__gifos");
const next = document.getElementById("next");
const back = document.getElementById("back");

var positionGif = 0;
var gifsLocalTrending = [];

(async function trendingGifs() {
  async function getData() {
    let baseApi = `${urlApy}?api_key=${api_key}`;
    const response = await fetch(baseApi);
    const data = await response.json();
    return data;
  }

  function createTemplateGifs(gifs) {
    return `<div class="item" data-id="${gifs.id}" onmouseenter="trendingMouseOver(event)" onmouseleave="trendingMouseLeave(event)">
              <div class="selected"></div>
              <div class="like"  onmouseenter="preferenceMouseOver(event)" onmouseleave="preferenceMouseLeave(event)">
                <i class="far fa-heart" onclick="like(event)"></i>
              </div>
              <div class="download"  onmouseenter="preferenceMouseOver(event)" onmouseleave="preferenceMouseLeave(event)">
                <i class="fas fa-download" onclick="download(event)"></i>
              </div>
              <div class="expand" onmouseenter="preferenceMouseOver(event)" onmouseleave="preferenceMouseLeave(event)">
                <i class="fas fa-expand-alt" onclick="expand(event)"></i>
              </div>
              <img
                src="${gifs.images.original.url}"
                alt="${gifs.title}"
              />
              <div class="gif-title">
                <span class="user">${gifs.username}</span>
                <span class="title">${gifs.title}</span>
              </div>
            </div> `;
  }

  var dataTrending = await getData();
  dataTrending.data.forEach((element) => {
    let templateGif = createTemplateGifs(element);
    trendingGifos.innerHTML += templateGif;
  });
  gifsTrendingLocal = dataTrending.data;
  // let totalGifs = (gifsTrendingLocal.length / 3)*100;
  // console.log(totalGifs);
  // trendingGifos.style.width = `${totalGifs}%`;
})();

function download(event) {
  alert("download");
  console.log(event);
}
function expand(event) {
  alert("expand");
  console.log(event);
}
function like(event) {
  event.target.classList.toggle("fas");
}

function trendingMouseOver(event) {
  event.target.childNodes[1].style.display = "block";
  event.target.childNodes[3].style.display = "flex";

  if (event.target.childNodes[3].childNodes[1].classList.contains("fas")) {
    event.target.childNodes[3].style.opacity = "1";
  } else {
    event.target.childNodes[3].style.opacity = "0.7";
  }
  event.target.childNodes[5].style.display = "flex";
  event.target.childNodes[7].style.display = "flex";
  event.target.childNodes[11].style.display = "block";
}

function trendingMouseLeave(event) {
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

function preferenceMouseOver(event) {
  event.target.style.opacity = "1";
}

function preferenceMouseLeave(event) {
  if (!event.target.childNodes[1].classList.contains("fas")) {
    event.target.style.opacity = "0.7";
  } else if (!event.target.classList.contains("like")) {
    event.target.style.opacity = "0.7";
  }
}

next.addEventListener("click", nextTrending);
back.addEventListener("click", backTrending);

function nextTrending(event) {
  let item = document.querySelector(".item");
  console.log(item.clientWidth);
}

function backTrending(event) {}
