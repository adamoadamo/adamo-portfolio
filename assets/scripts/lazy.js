document.addEventListener("DOMContentLoaded", function() {
  let lazyElements = [].slice.call(document.querySelectorAll("img.lazy, video.lazy"));
  
  if ("loading" in HTMLImageElement.prototype) {
    // Native lazy loading available
    lazyElements.forEach(function(element) {
      if (element.dataset.src) {
        element.src = element.dataset.src;
      }
      if (element.dataset.srcset) {
        element.srcset = element.dataset.srcset;
      }
      element.classList.remove("lazy");
    });
  } else if ("IntersectionObserver" in window) {
    // Use Intersection Observer
    let lazyElementObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyElement = entry.target;
          if (lazyElement.dataset.src) {
            lazyElement.src = lazyElement.dataset.src;
          }
          if (lazyElement.dataset.srcset) {
            lazyElement.srcset = lazyElement.dataset.srcset;
          }
          lazyElement.classList.remove("lazy");
          observer.unobserve(lazyElement);
        }
      });
    }, {
      rootMargin: "50px 0px",
      threshold: 0.01
    });

    lazyElements.forEach(function(lazyElement) {
      lazyElementObserver.observe(lazyElement);
    });
  } else {
    // Fallback for older browsers
    let active = false;

    const lazyLoad = function() {
      if (active === false) {
        active = true;

        setTimeout(function() {
          const stillLazy = lazyElements.filter(function(lazyElement) {
            if ((lazyElement.getBoundingClientRect().top <= window.innerHeight && lazyElement.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyElement).display !== "none") {
              if (lazyElement.dataset.src) {
                lazyElement.src = lazyElement.dataset.src;
              }
              if (lazyElement.dataset.srcset) {
                lazyElement.srcset = lazyElement.dataset.srcset;
              }
              lazyElement.classList.remove("lazy");
              return false;
            }
            return true;
          });

          lazyElements = stillLazy;

          if (lazyElements.length === 0) {
            document.removeEventListener("scroll", lazyLoad);
            window.removeEventListener("resize", lazyLoad);
            window.removeEventListener("orientationchange", lazyLoad);
          }

          active = false;
        }, 200);
      }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
    lazyLoad();
  }
});
  