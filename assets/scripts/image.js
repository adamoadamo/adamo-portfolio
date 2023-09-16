document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.image-item').forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const largeSrc = img.getAttribute('data-large-src');
        const largeWidth = img.getAttribute('data-large-width');
        const largeHeight = img.getAttribute('data-large-height');
        
        if (largeSrc) {
          img.src = largeSrc;
          img.width = largeWidth;
          img.height = largeHeight;
        }
      });
    });
  });
  