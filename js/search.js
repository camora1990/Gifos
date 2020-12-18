const search = document.getElementById("search");
const iconSearch = document.getElementById("icon-search");
const clearSearch = document.getElementById("clear-search");
const iconLeftSearch = document.querySelector(".icon-left");
const suggestions = document.getElementById("suggestions");
const urlApiSugestion = "https://api.giphy.com/v1/tags/related/";
("https://api.giphy.com/v1/tags/related/%7Bdog%7D?api_key=vhJ8PRnNPlfioc3JHjAskmPh3GdPK2J1");

search.addEventListener("input", searchInput);
search.addEventListener("keypress", searchEnter);

for (let index = 0; index < suggestions.children.length; index++) {
  suggestions.children[index].addEventListener("click", selectSugestion);
}

function searchInput(event) {
  let marginSearch = document.querySelector(".main__search--margin");
  if (event.target.value.length >= 1) {
    clearSearch.classList.remove("hidden");
    iconSearch.classList.add("hidden");
    clearSearch.addEventListener("click", clearInput);
    iconLeftSearch.style.display = "flex";
    suggestions.classList.remove("hidden");
    marginSearch.classList.remove("hidden");
    document.querySelector(".main p").style.display = "none";
    document.querySelector(".search-result__title").innerHTML =
      event.target.value;
    suggestionResult(event);
  } else {
    clearSearch.classList.add("hidden");
    iconSearch.classList.remove("hidden");
    iconLeftSearch.style.display = "none";
    suggestions.classList.add("hidden");
    marginSearch.classList.add("hidden");
    document.querySelector(".main p").style.display = "block";
    document.querySelector(".search-result__title").innerHTML = "";
  }
}

function clearInput(event) {
  let marginSearch = document.querySelector(".main__search--margin");
  search.value = "";
  clearSearch.classList.toggle("hidden");
  iconSearch.classList.toggle("hidden");
  iconLeftSearch.style.display = "none";
  clearSearch.classList.add("hidden");
  marginSearch.classList.add("hidden");
  suggestions.classList.add("hidden");
  document.querySelector(".main p").style.display = "block";
  document.querySelector(".search-result__title").innerHTML = "";
}

async function suggestionResult(event) {
  let url = `${urlApiSugestion}{${event.target.value}}`;
  var result = await getData(url, api_key);
  suggestions.children[0].children[1].innerHTML = result.data[0].name;
  suggestions.children[1].children[1].innerHTML = result.data[1].name;
  suggestions.children[2].children[1].innerHTML = result.data[2].name;
  suggestions.children[3].children[1].innerHTML = result.data[3].name;
}

function selectSugestion(event) {
  let marginSearch = document.querySelector(".main__search--margin");

  search.value = event.target.children[1].innerHTML;
  document.querySelector(".search-result__title").innerHTML =
    event.target.children[1].innerHTML;
  suggestions.classList.toggle("hidden");
  marginSearch.classList.toggle("hidden");
}

function searchEnter(event) {
  let marginSearch = document.querySelector(".main__search--margin");

  if (event.key == "Enter") {
    suggestions.classList.toggle("hidden");
    marginSearch.classList.toggle("hidden");
  }
}
