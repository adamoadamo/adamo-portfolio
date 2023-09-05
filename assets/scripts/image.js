document.addEventListener('DOMContentLoaded', function() {
    let images = document.querySelectorAll('.image-item img');
    let currentIndex = -1;
  
    images.forEach((img, index) => {
      img.addEventListener('click', function() {
        // Remove the active class from the previously clicked image
        if (currentIndex !== -1) {
          images[currentIndex].classList.remove('active');
        }
  
        // Toggle the active class for the clicked image
        if (currentIndex === index) {
          currentIndex = -1; // Reset index if the same image is clicked again
        } else {
          img.classList.add('active');
          currentIndex = index;
        }
      });
    });
  
    document.addEventListener('keydown', function(event) {
      if (currentIndex === -1) return; // Exit if no image is active
  
      if (event.key === 'ArrowRight') {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');
  
        // Go to the next image
        currentIndex = (currentIndex + 1) % images.length;
  
        // Add active class to the next image
        images[currentIndex].classList.add('active');
      }
      else if (event.key === 'ArrowLeft') {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');
  
        // Go to the previous image
        currentIndex = (currentIndex - 1 + images.length) % images.length;
  
        // Add active class to the previous image
        images[currentIndex].classList.add('active');
      }
    });
  });
  