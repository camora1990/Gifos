var theme = localStorage.getItem("theme");
const header = document.querySelector(".header");
const menu = document.querySelector(".header__menu");
const icon = document.getElementById("icon");
const device = window.matchMedia("screen and (max-width: 500px)");
const mode = document.getElementById("change-mode");
const css = document.getElementById("mode-style");

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
} else {
  css.href = "css/style-light-mode.css";
  mode.innerHTML = "MODO NOCTURNO";
}

function validation(event) {
  if (event.matches) {
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

  }
}

function showMenu(event) {
  icon.classList.toggle("fa-times");
  menu.classList.toggle("show-menu");
}

function createGif() {
  alert("prueba");
}

function changeMode(event) {
  if (localStorage.getItem("theme") == "dark") {
    localStorage.setItem("theme", "light");
    css.href = "css/style-light-mode.css";
    mode.innerHTML = "MODO NOCTURNO";
  } else if (localStorage.getItem("theme") == "light") {
    localStorage.setItem("theme", "dark");
    css.href = "css/style-dark-mode.css";
    mode.innerHTML = "MODO DIURNO";
  }
}

validation(device);
