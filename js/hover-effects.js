// Detect mobile device (touch OR small viewport for DevTools testing)
const isTouchDevice = ('ontouchstart' in window) || 
                      (navigator.maxTouchPoints > 0);
const isMobileViewport = window.innerWidth <= 768;

if (isTouchDevice || isMobileViewport) {
  // Use IntersectionObserver for mobile autoplay
  const observerOptions = {
    threshold: 0.5  // Trigger when 50% visible
  };

  // Video containers
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('.video-hover-animated');
      const staticImg = entry.target.querySelector('.video-hover-static');
      if (!video || !staticImg) return;
      
      if (entry.isIntersecting) {
        entry.target.classList.add('mobile-playing');
        video.play().catch(function(error) {
          // Handle autoplay restrictions
          console.log('Video autoplay prevented:', error);
        });
      } else {
        entry.target.classList.remove('mobile-playing');
        video.pause();
      }
    });
  }, observerOptions);

  // Function to check and play videos in viewport
  function checkInitialViewport() {
    document.querySelectorAll('.video-hover-container').forEach(c => {
      const rect = c.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        const video = c.querySelector('.video-hover-animated');
        const staticImg = c.querySelector('.video-hover-static');
        if (video && staticImg) {
          // Check intersection ratio
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const intersectionRatio = visibleHeight / rect.height;
          
          if (intersectionRatio >= 0.5) {
            c.classList.add('mobile-playing');
            video.play().catch(function(error) {
              console.log('Video autoplay prevented:', error);
            });
          }
        }
      }
    });
  }

  document.querySelectorAll('.video-hover-container').forEach(c => {
    videoObserver.observe(c);
  });
  
  // Check initial viewport after layout is complete
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkInitialViewport);
  } else {
    // Use requestAnimationFrame to ensure layout is complete
    requestAnimationFrame(() => {
      setTimeout(checkInitialViewport, 100);
    });
  }

  // GIF containers (swap src to trigger animation)
  const gifObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const gif = entry.target.querySelector('.gif-hover-animated');
      const staticImg = entry.target.querySelector('.gif-hover-static');
      if (!gif || !staticImg) return;
      
      if (entry.isIntersecting) {
        entry.target.classList.add('mobile-playing');
        // Reset GIF to restart animation
        const src = gif.src;
        gif.src = '';
        gif.src = src;
      } else {
        entry.target.classList.remove('mobile-playing');
      }
    });
  }, observerOptions);

  // Function to check and play GIFs in viewport
  function checkInitialGifViewport() {
    document.querySelectorAll('.gif-hover-container').forEach(c => {
      const rect = c.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        const gif = c.querySelector('.gif-hover-animated');
        const staticImg = c.querySelector('.gif-hover-static');
        if (gif && staticImg) {
          // Check intersection ratio
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const intersectionRatio = visibleHeight / rect.height;
          
          if (intersectionRatio >= 0.5) {
            c.classList.add('mobile-playing');
            // Reset GIF to restart animation
            const src = gif.src;
            gif.src = '';
            gif.src = src;
          }
        }
      }
    });
  }

  document.querySelectorAll('.gif-hover-container').forEach(c => {
    gifObserver.observe(c);
  });
  
  // Check initial viewport after layout is complete
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkInitialGifViewport);
  } else {
    // Use requestAnimationFrame to ensure layout is complete
    requestAnimationFrame(() => {
      setTimeout(checkInitialGifViewport, 100);
    });
  }
} else {
  // Desktop: Restart GIF animation on hover
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

  // Desktop: Play/pause video on hover
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
}

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
