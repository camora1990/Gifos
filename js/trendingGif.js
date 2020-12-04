const urlApi = "https://api.giphy.com/v1/gifs/trending";
const api_key = "vhJ8PRnNPlfioc3JHjAskmPh3GdPK2J1";
const trendingGifos = document.querySelector(".trending__gifos");
const next = document.getElementById("next");
const back = document.getElementById("back");
const deviceTrending = window.matchMedia("screen and (max-width: 500px)");
var totalGifs;
var gifPosition = 0;
var localTrendingGifs = [];
var widthItem;
var marginRightItem;

(async function trendingGifs() {
  async function getData() {
    let baseApi = `${urlApi}?api_key=${api_key}`;
    const response = await fetch(baseApi);
    const data = await response.json();
    return data;
  }

  style = "width: 100px; margin-right: 100px;";

  function createTemplateGifs(gifs, width, marginRight) {
    return `<li style="width: ${width}%; margin-right: ${marginRight}%;" class="item" data-id="${gifs.id}" onmouseenter="trendingMouseOver(event)" onmouseleave="trendingMouseLeave(event)">
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
            </li> `;
  }

  var dataTrending = await getData();
  localTrendingGifs = dataTrending.data;
  totalGifs = localTrendingGifs.length;
  const widthTrendingGifos = totalGifs * 33.333333;
  trendingGifos.style.width = `${widthTrendingGifos}%`;

  dataTrending.data.forEach((element) => {
    widthItem = (widthTrendingGifos * 0.96) / totalGifs;
    marginRightItem = 4 / totalGifs;
    let templateGif = createTemplateGifs(element, widthItem, marginRightItem);
    trendingGifos.innerHTML += templateGif;
  });
})();

deviceTrending.addEventListener("change", validationScreen);

function validationScreen(event) {
  validationMobile(event)
}

function validationMobile(event) {
  console.log(event.matches)
  if (event.matches) {
    trendingMobileItem(event);
  } else {
    trendingDesktopItem(event);
  }
}

function download(event) {
  alert("download");
  console.log(event);
  let img = event.target.parentNode.parentElement.childNodes[9];
  console.log(img)
  let downloadLink = img.src
  event.setAttribute('download', downloadLink);
  linkElement.href = downloadLink;
  linkElement.click();
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
  if (gifPosition < totalGifs - 3) {
    gifPosition++;
    trendingGifos.style.left = `-${33.3333333333 * gifPosition}%`;
    trendingGifos.style.transition = ".7s left ease-in-out"
  }
}

function backTrending(event) {
  if (gifPosition > 0) {
    gifPosition--;
    trendingGifos.style.left = `-${33.3333333333 * gifPosition}%`;
  }
}

function trendingMobileItem(event) {
  let item = document.querySelectorAll(".item");
  let trendingGifosContainer = document.querySelector(".trending__container");
  trendingGifosContainer.style.display = "flex";
  trendingGifos.style.width = 'auto';
  item.forEach((element) => {
    element.style.width = 64.8 + "vw";
    element.style.marginRight = 6+'vw'

  });
}

function trendingDesktopItem(event) {
  let item = document.querySelectorAll(".item");
  let trendingGifosContainer = document.querySelector(".trending__container");
  trendingGifos.style.width = `${totalGifs * 33.333333}%`;
  trendingGifosContainer.style.display = "block";
  item.forEach((element) => {
    element.style.width = widthItem + "%";
    element.style.marginRight = marginRightItem+'%'
  });
}


validationMobile(deviceTrending)