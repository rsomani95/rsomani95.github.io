// Restart GIF animation on hover
document.querySelectorAll('.gif-hover-container').forEach(function(container) {
  var gif = container.querySelector('.gif-hover-animated');
  if (!gif) return;
  var originalSrc = gif.src;
  
  container.addEventListener('mouseenter', function() {
    // Reset the GIF to restart animation
    gif.src = '';
    gif.src = originalSrc;
  });
});

// Play/pause video on hover
document.querySelectorAll('.video-hover-container').forEach(function(container) {
  var video = container.querySelector('.video-hover-animated');
  if (!video) return;
  
  container.addEventListener('mouseenter', function() {
    video.currentTime = 0;
    video.play();
  });
  
  container.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
  });
});

// Autoplay video with pause/play toggle and seamless looping
document.querySelectorAll('.video-autoplay-container').forEach(function(container) {
  var video = container.querySelector('video');
  var btn = container.querySelector('.video-pause-btn');
  if (!video || !btn) return;
  
  // Seamless loop: reset video slightly before it ends to avoid black frame
  video.addEventListener('timeupdate', function() {
    // Reset 0.1 seconds before end to create seamless loop
    if (video.duration && video.currentTime >= video.duration - 0.1) {
      video.currentTime = 0;
    }
  });
  
  btn.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      btn.classList.remove('paused');
    } else {
      video.pause();
      btn.classList.add('paused');
    }
  });
});
