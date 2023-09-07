document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded");

  const sortAlphaBtn = document.getElementById('sortAlpha');
  const sortChronoBtn = document.getElementById('sortChrono');
  
  let recentlyFocused = false; // Add this flag to manage focus/click interaction

  if (!sortAlphaBtn || !sortChronoBtn) {
    console.error("Sort buttons not found");
    return;
  }

  console.log("Sort buttons found");

  const assortment = document.getElementById('assortment');
  let flexItems = Array.from(assortment.getElementsByClassName('flex-item'));

  if (flexItems.length === 0) {
    console.error("No flex items found");
    return;
  }

  console.log(`Found ${flexItems.length} flex items`);

  let currentIndex = 0;

  const toggleActiveClass = (event) => {
    if (recentlyFocused) {
      recentlyFocused = false; // Reset the flag
    } else {
      event.currentTarget.classList.toggle('active');
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
    flexItems.forEach((item, index) => {
      item.addEventListener('focus', () => {
        console.log(`Item focused, index: ${index}`);
        currentIndex = index;
        recentlyFocused = true; // Set the flag
        
        // Remove 'active' class from all items
        flexItems.forEach(i => i.querySelector('.navigable-item').classList.remove('active'));

        // Add 'active' class to the currently focused item
        const navigableItem = item.querySelector('.navigable-item');
        if (navigableItem) {
          navigableItem.classList.add('active');
        }
      });
    });
  };

  registerNavigation();  // Initial registration
  registerClickToToggle(); // Initial click registration

  document.addEventListener('keydown', function(event) {
    console.log(`Keydown event: ${event.key}`);
    if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % flexItems.length;
      console.log(`New index after ArrowRight: ${currentIndex}`);
      flexItems[currentIndex].focus();
    } else if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + flexItems.length) % flexItems.length;
      console.log(`New index after ArrowLeft: ${currentIndex}`);
      flexItems[currentIndex].focus();
    }
  });

  const sortItems = (type) => {
    let sortedItems;
    if (type === 'alpha') {
      sortedItems = flexItems.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
      console.log("Sorted alphabetically");
    } else {
      sortedItems = flexItems.sort((a, b) => parseInt(a.dataset.year, 10) - parseInt(b.dataset.year, 10));
      console.log("Sorted chronologically");
    }

    assortment.innerHTML = '';
    sortedItems.forEach((item) => {
      assortment.appendChild(item);
    });

    registerNavigation();  // Re-register after sorting
    registerClickToToggle(); // Re-register click events after sorting
    console.log("Re-registered navigation after sorting");
  };

  sortItems('alpha');
  sortAlphaBtn.classList.add('selected');
  document.getElementById('totalMdFiles').innerText = flexItems.length;
  console.log("Initial sorting complete");

  sortAlphaBtn.addEventListener('click', () => {
    sortItems('alpha');
    sortAlphaBtn.classList.add('selected');
    sortChronoBtn.classList.remove('selected');
    console.log("Sorted alphabetically via button");
  });

  sortChronoBtn.addEventListener('click', () => {
    sortItems('chrono');
    sortChronoBtn.classList.add('selected');
    sortAlphaBtn.classList.remove('selected');
    console.log("Sorted chronologically via button");
  });
});
