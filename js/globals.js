const api_key = "vhJ8PRnNPlfioc3JHjAskmPh3GdPK2J1";
var localTrendingGifs = [];
var swTrending = false;
var swSearch = false;
var swFavorites = false;
var swCreate = false;
var swMyGifs = false;
const footer = document.querySelector(".footer");
footer.classList.remove("footer-fixed");

// https://api.giphy.com/v1/trending/searches?api_key=vhJ8PRnNPlfioc3JHjAskmPh3GdPK2J1
//https://api.giphy.com/v1/gifs/search?q=chuck&api_key=vhJ8PRnNPlfioc3JHjAskmPh3GdPK2J1

if (
  JSON.parse(localStorage.getItem("favorites")) === null ||
  JSON.parse(localStorage.getItem("favorites")) === undefined
) {
  localStorage.setItem("favorites", JSON.stringify([]));
}

async function getData(url, key) {
  let baseApi = `${url}api_key=${key}`;
  const response = await fetch(baseApi);
  const data = await response.json();
  return data;
}

async function downloadGif(imgUrl) {
  const img = (await fetch(imgUrl)).blob();
  const urlGif = URL.createObjectURL(await img);
  const a = document.createElement("a");
  a.href = urlGif;
  a.download = "gifhy.gif";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

(async function trend() {
  debugger
  let urltemp = "https://api.giphy.com/v1/trending/searches?";
  let dat = await getData(urltemp, api_key);
  if (dat.data.length > 0) {
    let containerTrends = document.getElementById("trending-now");
    let templateTrends = `<span class="trending-now__element" onclick="getTrend(event)">${dat.data[0]}</span>,
                          <span class="trending-now__element"  onclick="getTrend(event)">${dat.data[1]}</span>,
                          <span class="trending-now__element"  onclick="getTrend(event)">${dat.data[2]}</span>,
                          <span class="trending-now__element"  onclick="getTrend(event)">${dat.data[3]}</span>,
                          <span class="trending-now__element"  onclick="getTrend(event)">${dat.data[4]}</span>`;

    containerTrends.innerHTML += templateTrends;
  }
})();

function favoriteGif(id, arrayGif, event) {
  let myGifs = [];
  myGifs = JSON.parse(localStorage.getItem("favorites"));
  let indexMyGifs = myGifs.findIndex((data) => data.id === id);
  if (indexMyGifs == -1 && event.target.classList.contains("far")) {
    event.target.classList.toggle("fas");
    event.target.classList.toggle("far");
    myGifs.push({
      id: arrayGif[0].id,
      url: arrayGif[0].url,
      title: arrayGif[0].title,
      user: arrayGif[0].user,
    });
    localStorage.setItem("favorites", JSON.stringify(myGifs));
  } else {
    event.target.classList.toggle("far");
    event.target.classList.toggle("fas");
    let index = myGifs.findIndex((data) => data.id === id);
    myGifs.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(myGifs));
  }
}
