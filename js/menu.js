var theme = localStorage.getItem("theme");
const header = document.querySelector(".header");
const menu = document.querySelector(".header__menu");
const icon = document.getElementById("icon");
const device = window.matchMedia("screen and (max-width: 500px)");
const mode = document.getElementById("change-mode");
const css = document.getElementById("mode-style");

// icon.addEventListener('click', navigate)
window.document.addEventListener("scroll", eventScroll);
device.addEventListener("change", validation);
mode.addEventListener("click", changeMode);





function eventScroll(event) {
  let position = window.scrollY
  if(position > 0){
    header.classList.add("scroll-header")
  }else{
    header.classList.remove("scroll-header")
  }
}

if (theme === undefined || theme === null) {
  css.href = "css/style-light-mode.css";
  localStorage.setItem("theme", "light");
  mode.innerHTML = "MODO NOCTURNO";
} else if (theme == "dark") {
  css.href = "css/style-dark-mode.css";
  mode.innerHTML = "MODO DIURNO";
  if (swCreate) {
    let pelicula = document.querySelector('.pelicula')
    let camara = document.querySelector('.video-container__item-left--camera')
    pelicula.src = "assets/img/pelicula-modo-noc.svg"
    camara.src =  "assets/img/camara-modo-noc.svg"

  }
} else {
  css.href = "css/style-light-mode.css";
  mode.innerHTML = "MODO NOCTURNO";
}

function validation(event) {
  if (event.matches) {
    icon.parentNode.href = "#"
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-plus");
    icon.removeEventListener("click", createGif);
    icon.addEventListener("click", showMenu);


  } else {
    icon.classList.add("fa-plus");
    icon.classList.remove("fa-bars");
    icon.classList.remove("fa-times");
    icon.addEventListener("click", createGif);
    icon.removeEventListener("click", showMenu);
    icon.parentNode.href = "crear-gif.html"

  }
}

function showMenu(event) {
  icon.classList.toggle("fa-times");
  menu.classList.toggle("show-menu");
}

function createGif(event) {
  if (icon.classList.contains('plus')) {
    window.location.href = "crear-gif.html"

  }
}

function changeMode(event) {
  if (localStorage.getItem("theme") == "dark") {
    localStorage.setItem("theme", "light");
    css.href = "css/style-light-mode.css";
    mode.innerHTML = "MODO NOCTURNO";
    if (swCreate) {
      let pelicula = document.querySelector('.pelicula')
      let camara = document.querySelector('.video-container__item-left--camera')
      pelicula.src = "assets/img/pelicula.svg"
      camara.src =  "assets/img/camara.svg"
  
    }
  } else if (localStorage.getItem("theme") == "light") {
    localStorage.setItem("theme", "dark");
    css.href = "css/style-dark-mode.css";
    mode.innerHTML = "MODO DIURNO";
    if (swCreate) {
      let pelicula = document.querySelector('.pelicula')
      let camara = document.querySelector('.video-container__item-left--camera')
      pelicula.src = "assets/img/pelicula-modo-noc.svg"
      camara.src =  "assets/img/camara-modo-noc.svg"
  
    }
  }
}

validation(device);
