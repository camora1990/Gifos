const urlApiUpload = "https://upload.giphy.com/v1/gifs";
const iconMenu = document.getElementById("icon");
const videoStep0 = document.querySelector(
  ".video-container__item-center--step0"
);
const start = document.getElementById("start");
const video = document.getElementById("record-gifs");
const record = document.getElementById("record");
const step1 = document.querySelector(".video-steps__numbers--1");
const step2 = document.querySelector(".video-steps__numbers--2");
const step3 = document.querySelector(".video-steps__numbers--3");
const timer = document.querySelector(".video-steps__timer");
const upload = document.getElementById("upload");
const loading = document.querySelector(".loading");
const newGif = document.getElementById("new");
const download = document.getElementById("download")
const link = document.getElementById("link")
const preferences = document.getElementById("preferences")

var urlGif;
var localStream;
var startTimer = false;
var formatImg;
let recorder;
swCreate = true;

if (
  JSON.parse(localStorage.getItem("myGifs")) === null ||
  JSON.parse(localStorage.getItem("myGifs")) === undefined
) {
  localStorage.setItem("myGifs", JSON.stringify([]));
}

download.addEventListener("click", downloadGifo)
link.addEventListener("click", copyLink)
upload.addEventListener("click", uploadGifs);
record.addEventListener("click", startRecord);
start.addEventListener("click", startCreation);
newGif.addEventListener("click", createNewGif);

footer.classList.add("footer-fixed");
iconMenu.parentNode.style.backgroundColor = "#9CAFC3";
iconMenu.parentNode.style.border = "1px solid #9CAFC3";
iconMenu.parentNode.style.borderradius = "none";
iconMenu.style.color = "#ffffff";

function startCreation(event) {
  videoStep0.children[0].innerHTML = "¿Nos das Acceso <br> a tu camara?";
  videoStep0.children[1].innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;
  step1.classList.add("step-selected");
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
      localStream = stream;
      handleSuccess(stream);
      start.style.display = "none";
    })
    .catch(function (e) {
      let step1 = document.querySelector(".video-steps__numbers--1");
      alert("El permiso a tu camara fue rechazado");
      videoStep0.children[0].innerHTML =
        "Aquí podrás <br> crear tus propios <span>GIFOS</span> ";
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
  record.style.display = "block";
  step1.classList.remove("step-selected");
  step2.classList.add("step-selected");
}

function downloadGifo(event) {
  downloadGif(urlGif)
}
function copyLink(event) {
  let aux = document.createElement("input")
  aux.value = urlGif
  document.body.appendChild(aux)
  aux.select()
  document.execCommand("copy")
  document.body.removeChild(aux)
}

function startRecord(event) {
  timer.style.display = "block";
  startTimer = !startTimer;
  if (startTimer) {
    timer.classList.remove("repeat");
    record.style.display = "block";
    upload.style.display = "none";
    record.innerHTML = "Finalizar";
    cronometro();
  } else {
    cronometro();
    document.querySelector(".video-steps__timer").innerHTML = "REPETIR CAPTURA";
    timer.addEventListener("click", startRecord);
    timer.classList.add("repeat");
    upload.style.display = "block";
    record.style.display = "none";
    stop();
  }
  initRecording();
}


function cronometro() {
  let seconds = 0;
  let minutes = 0;
  let timer = setInterval(() => {
    if (startTimer) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = "0" + seconds;
        }
        document.querySelector(
          ".video-steps__timer"
        ).innerHTML = `00:0${minutes}:${seconds}`;
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function initRecording(event) {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (stream) {
      let preview = document.getElementById("preview");

      if (startTimer) {
        this.disabled = true;
        recorder = RecordRTC(stream, {
          type: "gif",
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function () {
            console.log("started");
          },
        });
        preview.style.display = "none";
        video.style.display = "flex";
        recorder.startRecording();
        recorder.camera = stream;
      } else {
        this.disabled = true;
        recorder.stopRecording(stopRecordingCallback);
        preview.style.display = "flex";
        video.style.display = "none";
        startTimer = false;
      }
    });
}

function stopRecordingCallback() {
  recorder.camera.stop();

  let preview = document.getElementById("preview");

  formatImg = new FormData();
  formatImg.append("file", recorder.getBlob(), "test.gif");

  objectURL = URL.createObjectURL(recorder.getBlob());
  preview.src = objectURL;

  recorder.destroy();
  recorder = null;
}

function createNewGif(event) {
  let preview = document.getElementById("preview");
  let loadingContainer = document.querySelector(".loading__container");
  preferences.style.display = "none"

  record.innerHTML = "GRABAR";
  newGif.style.display = "none";
  record.style.display = "block";
  step2.classList.add("step-selected");
  step3.classList.remove("step-selected");
  preview.style.display = "none";
  loading.style.display = 'none'
  loadingContainer.children[1].innerHTML = "Estamos subiendo tu GIFO";
  loadingContainer.children[0].src = "assets/img/Spinner-1s-200px.svg";
  video.style.display = 'flex'
  document.querySelector(".video-steps__timer").innerHTML = "00:00:00";
}

async function uploadGifs(params) {
  loading.style.display = "flex";
  step2.classList.remove("step-selected");
  step3.classList.add("step-selected");
  timer.style.display = "none";
  let loadingContainer = document.querySelector(".loading__container");
  let data = await load();
  if (data.meta.status != 200) {
    Error;
    loadingContainer.children[0].src = "assets/img/Error.svg";
    loadingContainer.children[1].innerHTML = "ERROR al cargar GIFO";
  } else {
    const idGif = data.data.id;
    await getGifsDetails(idGif);
    loadingContainer.children[0].src = "assets/img/ok.svg";
    loadingContainer.children[1].innerHTML = "GIFO subido con éxito";
    newGif.style.display = "block";
    upload.style.removeProperty("display");
    preferences.style.display = "flex"
  }
}

async function load(params) {
  let res = await fetch(`${urlApiUpload}?api_key=${api_key}`, {
    method: "POST",
    body: formatImg,
  }).catch(() => {
    Error;
    loadingContainer.children[0].src = "assets/img/Error.svg";
    loadingContainer.children[1].innerHTML = "ERROR al cargar GIFO";
  });
  let data = await res.json();
  return data;
}

async function getGifsDetails(id) {
  let url = `https://api.giphy.com/v1/gifs/${id}?`;
  let details = await getData(url, api_key);
  let temMyGifs = JSON.parse(localStorage.getItem("myGifs"));
  urlGif = details.data.images.original.url
  temMyGifs.push({
    id: details.data.id,
    url: details.data.images.original.url,
    title: details.data.title,
    user: details.data.username,
  });
  localStorage.setItem("myGifs", JSON.stringify(temMyGifs));
}
