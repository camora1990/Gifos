const urlApy = "https://api.giphy.com/v1/gifs/trending";
const api_key = "vhJ8PRnNPlfioc3JHjAskmPh3GdPK2J1";
const trendingGifos = document.querySelector(".trending__gifos");

(async function trendingGifs() {
  async function getData() {
    let baseApi = `${urlApy}?api_key=${api_key}`;
    const response = await fetch(baseApi);
    const data = await response.json();
    return data;
  }

  function createTemplateGifs(gifs) {
    return `<div class="item" data-id="${gifs.id}">
              <div class="selected"></div>
              <div class="like" onclick="like(event)">
                <i class="far fa-heart"></i>
              </div>
              <div class="download" onclick="download(event)">
                <i class="fas fa-download"  ></i>
              </div>
              <div class="expand" onclick="expand(event)">
                <i class="fas fa-expand-alt"></i>
              </div>
              <img
                src="${gifs.images.original.url}"
                alt="${gifs.title}"
              />
            </div> `;
  }

  var dataTrending = await getData();
  dataTrending.data.forEach((element) => {
    let templateGif = createTemplateGifs(element);
    trendingGifos.innerHTML += templateGif;
  });
})();

function download(event) {
  alert("like");
  console.log(event);
}
function expand(event) {
  alert("expand");
  console.log(event);
}
function like(event) {
  alert("download");
  console.log(event);
}

