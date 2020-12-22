const api_key = "vhJ8PRnNPlfioc3JHjAskmPh3GdPK2J1";
var localTrendingGifs = [];
var swTrending = false;
var swSearch = false;
var swFavorites = false;

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
      user: arrayGif[0].username,
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
