document.addEventListener('DOMContentLoaded', function() {
  let items = document.querySelectorAll('.navigable-item');
  let currentIndex = -1;

  function scrollItemIntoView(item) {
    item.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
  }

  items.forEach((item, index) => {
    item.addEventListener('click', function() {
      if (currentIndex !== -1) {
        items[currentIndex].classList.remove('active');
        let prevImg = items[currentIndex].querySelector('img');
        if (prevImg) prevImg.classList.remove('active');
      }

      if (currentIndex === index) {
        currentIndex = -1;
      } else {
        item.classList.add('active');
        let img = item.querySelector('img');
        if (img) img.classList.add('active');
        currentIndex = index;
        scrollItemIntoView(item);
      }
    });
  });

  document.addEventListener('keydown', function(event) {
    if (currentIndex === -1) return;

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      items[currentIndex].classList.remove('active');
      let prevImg = items[currentIndex].querySelector('img');
      if (prevImg) prevImg.classList.remove('active');

      if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % items.length;
      } else {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
      }

      let newItem = items[currentIndex];
      newItem.classList.add('active');
      let img = newItem.querySelector('img');
      if (img) img.classList.add('active');

      scrollItemIntoView(newItem);
    }
  });
});
