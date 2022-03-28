let audio = document.querySelector('audio');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let volume_slider = document.querySelector('.volume_slider');
let updateTimer;    
window.addEventListener("load", () => {
clearInterval(updateTimer);
  const bar = document.querySelectorAll(".bar");
  for (let i = 0; i < 20; i++) {
    bar.forEach((item, j) => {
      // Random move
      item.style.animationDuration = `${
        Math.random() * (0.7 - 0.2) + 0.2
      }s`; // Change the numbers for speed / ( max - min ) + min / ex. ( 0.5 - 0.1 ) + 0.1
    });
  }
});

function playpauseTrack() {
  document.querySelector(".sound-wave").style.visibility= "visible";
  updateTimer = setInterval(setUpdate, 1000);
  audio.play();
  document.querySelector("#pause-icon").style.display= 'inline-block ';
  document.querySelector("#play-icon").style.display= 'none';

}
function repeatTrack() {
  // document.querySelector(".sound-wave").style.visibility= "visible";
  audio.currentTime = 0;
}
function playTrack(){
  document.querySelector("#pause-icon").style.display= 'none';
  document.querySelector("#play-icon").style.display= 'inline-block';
  document.querySelector(".sound-wave").style.visibility=  "hidden";
  audio.pause();
}
function unmuteTrack(){
  document.querySelector("#mute-icon").style.display = "inline-block"
  document.querySelector("#unmute-icon").style.display = "none"
  audio.muted = true;
  

}
function muteTrack(){
  document.querySelector("#mute-icon").style.display = "none"
  document.querySelector("#unmute-icon").style.display = "inline-block"
  audio.muted = false;
}

function setVolume(){
  audio.volume = volume_slider.value / 100;
}
// const playBtn = document.querySelector("button");
const progressEl = document.querySelector('.seek_slider');
let mouseDownOnSlider = false;

audio.addEventListener("loadeddata", () => {
  progressEl.value = 0;
});
audio.addEventListener("timeupdate", () => {
  if (!mouseDownOnSlider) {
    progressEl.value = audio.currentTime / audio.duration * 100;
  }
});

progressEl.addEventListener("change", () => {
  const pct = progressEl.value / 100;
  audio.currentTime = (audio.duration || 0) * pct;
});
progressEl.addEventListener("mousedown", () => {
  mouseDownOnSlider = true;
});
progressEl.addEventListener("mouseup", () => {
  mouseDownOnSlider = false;
});
function setUpdate(){
// let seekPosition = 0;
if(!isNaN(audio.duration)){
  // seekPosition = audio.currentTime * (100 / audio.duration);
  // seek_slider.value = seekPosition;

  let currentMinutes = Math.floor(audio.currentTime / 60);
  let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

  if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
  if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
  if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
  if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

  curr_time.textContent = currentMinutes + ":" + currentSeconds + "/";
  total_duration.textContent = durationMinutes + ":" + durationMinutes;
}
}