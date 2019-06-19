// Saenuri

var canPlay = false;
var CAN_PLAY_READYSTATE = 4;

function hideAndPlay(elToHide, elToPlay) {
  elToHide.className += ' uk-animation-slide-top-medium uk-animation-reverse';
  setTimeout(function() {
    elToPlay.style.visibility = 'visible';
    var videoEl = document.getElementById('main-video');
    window.requestAnimationFrame(function() {
      videoEl.play();
    });
  }, 1300);
}

function onLoadStart(e) {
  var videoEl = document.getElementById('main-video');
  var duration = 0;
  var id = window.setInterval(function() {
    duration += 200;
    if (videoEl.readyState === CAN_PLAY_READYSTATE) {
      canPlay = true;
    }
    if (duration >= 1000 && canPlay === true) {
      clearInterval(id);
    }
  }, 200);
}

function onCanPlayThrough(e) {
    canPlay = true;
    var videoContainerEl = document.querySelector('.video-container');
    var loadingContainerEl = document.querySelector('.loading-page-container');
    hideAndPlay(loadingContainerEl, videoContainerEl);
}

function onEnded(e) {
  var videoContainerEl = document.querySelector('.main-page');
  videoContainerEl.className += ' uk-animation-fade uk-animation-reverse';
  videoContainerEl.addEventListener('animationend', function() {
    videoContainerEl.style.display = 'none';
    var infoPageEl = document.querySelector('.info-page');
    infoPageEl.className += ' uk-animation-fade';
    infoPageEl.style.display = 'flex';
  });
}

//document.getElementById('main-video').addEventListener('loadstart', onLoadStart, false);
document.getElementById('main-video').addEventListener('canplaythrough', onCanPlayThrough, false);
document.getElementById('main-video').addEventListener('ended', onEnded, false);
