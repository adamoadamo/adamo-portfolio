document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.setAttribute('loading', 'lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
          else {
            entry.target.removeAttribute('loading');
          }
        });
      }, {
        rootMargin: "0px 0px -200px 0px"
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  });
  