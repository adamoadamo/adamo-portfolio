document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded");

  const sortAlphaBtn = document.getElementById('sortAlpha');
  const sortChronoBtn = document.getElementById('sortChrono');
  
  if (!sortAlphaBtn || !sortChronoBtn) {
    console.log("Sort buttons not found");
    return;
  }

  console.log("Sort buttons found");

  const assortment = document.getElementById('assortment');
  let flexItems = Array.from(assortment.getElementsByClassName('flex-item'));

  if (flexItems.length === 0) {
    console.log("No flex items found");
    return;
  }

  console.log(`Found ${flexItems.length} flex items`);

  let currentIndex = 0;

  const toggleActiveClass = (event) => {
    const currentItem = event.currentTarget;
    
    flexItems.forEach(i => {
      const navigableItem = i.querySelector('.navigable-item');
      const imageCaption = navigableItem.querySelector('.image-caption');
      
      if(navigableItem !== currentItem) {
        navigableItem.classList.remove('active');
        if(imageCaption) imageCaption.style.opacity = "0";
      }
    });

    currentItem.classList.toggle('active');
    currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });

    const imageCaption = currentItem.querySelector('.image-caption');
    if (imageCaption) {
      imageCaption.style.opacity = currentItem.classList.contains('active') ? "1" : "0";
    }
  };
  
  const registerClickToToggle = () => {
    flexItems.forEach(item => {
      const navigableItem = item.querySelector('.navigable-item');
      if (navigableItem) {
        navigableItem.removeEventListener('click', toggleActiveClass);
        navigableItem.addEventListener('click', toggleActiveClass);
      }
    });
  };

  const registerNavigation = () => {
    console.log("Registering navigation...");
    flexItems = Array.from(assortment.getElementsByClassName('flex-item'));
  };

  registerNavigation();  // Initial registration
  registerClickToToggle(); // Initial click registration

  document.addEventListener('keydown', function(event) {
    console.log(`Keydown event: ${event.key}`);
    
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const activeItem = flexItems[currentIndex].querySelector('.navigable-item');
      const activeItemCaption = activeItem ? activeItem.querySelector('.image-caption') : null;
      if (activeItem) {
        activeItem.classList.remove('active');
        if(activeItemCaption) activeItemCaption.style.opacity = "0";
      }
  
      currentIndex = event.key === 'ArrowRight' 
        ? (currentIndex + 1) % flexItems.length 
        : (currentIndex - 1 + flexItems.length) % flexItems.length;
  
      const newActiveItem = flexItems[currentIndex].querySelector('.navigable-item');
      const newActiveItemCaption = newActiveItem ? newActiveItem.querySelector('.image-caption') : null;
      if (newActiveItem) {
        newActiveItem.classList.add('active');
        if(newActiveItemCaption) newActiveItemCaption.style.opacity = "1";
      }
    }
  });
  

  const sortItems = (type) => {
    let sortedItems;
    if (type === 'alpha') {
      sortedItems = flexItems.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
    } else {
      sortedItems = flexItems.sort((a, b) => parseInt(a.dataset.year, 10) - parseInt(b.dataset.year, 10));
    }

    assortment.innerHTML = '';
    sortedItems.forEach((item) => {
      assortment.appendChild(item);
    });

    registerNavigation();  // Re-register after sorting
    registerClickToToggle(); // Re-register click events after sorting
  };

  sortItems('alpha');
  sortAlphaBtn.classList.add('selected');
  document.getElementById('totalMdFiles').innerText = flexItems.length;

  sortAlphaBtn.addEventListener('click', () => {
    sortItems('alpha');
    sortAlphaBtn.classList.add('selected');
    sortChronoBtn.classList.remove('selected');
  });

  sortChronoBtn.addEventListener('click', () => {
    sortItems('chrono');
    sortChronoBtn.classList.add('selected');
    sortAlphaBtn.classList.remove('selected');
  });
});
