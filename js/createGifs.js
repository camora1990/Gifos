const iconMenu = document.getElementById("icon");
const videoStep0 = document.querySelector(
  ".video-container__item-center--step0"
);
const start = document.getElementById("start");
const video = document.getElementById("record-gifs");
const record = document.getElementById('record')
const step1 = document.querySelector(".video-steps__numbers--1");
const step2 = document.querySelector(".video-steps__numbers--2");

record.addEventListener('click', startRecord)
start.addEventListener("click", startCreation);

footer.classList.add("footer-fixed");
iconMenu.parentNode.style.backgroundColor = "#9CAFC3";
iconMenu.parentNode.style.border = "1px solid #9CAFC3";
iconMenu.parentNode.style.borderradius = "none";
iconMenu.style.color = "#ffffff";

function startCreation(event) {
  videoStep0.children[0].innerHTML = "¿Nos das Acceso <br> a tu camara?";
  videoStep0.children[1].innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;
  step1.classList.add("step-selected");
  start.style.display = "none";
  init();
}

// Access webcam
function init() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (stream) {
      handleSuccess(stream);
    })
    .catch(function (e) {
        let step1 = document.querySelector(".video-steps__numbers--1");
        alert("El permiso a tu camara fue rechazado")
        videoStep0.children[0].innerHTML = "Aquí podrás <br> crear tus propios <span>GIFOS</span> ";
        videoStep0.children[1].innerHTML = `¡Crea tu GIFO en sólo 3 pasos! <br>(sólo necesitas una cámara para grabar un video)`;
        step1.classList.remove("step-selected");
        start.style.display = "block";
    });
}

function handleSuccess(stream) {
  videoStep0.style.display = "none";
  video.style.display = "flex";
  video.srcObject = stream;
  video.play();
  record.style.display = 'block'
  step1.classList.remove("step-selected");
  step2.classList.add("step-selected");
}

function startRecord(event) {
    alert('Holi')
}
