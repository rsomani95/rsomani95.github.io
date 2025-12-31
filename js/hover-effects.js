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

