var myGifs = [];
var localTrendingGifs = [];

async function getData(url, key) {
  let baseApi = `${url}?api_key=${key}`;
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
