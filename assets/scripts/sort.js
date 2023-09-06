document.addEventListener('DOMContentLoaded', function() {
  const sortAlphaBtn = document.getElementById('sortAlpha');
  const sortChronoBtn = document.getElementById('sortChrono');
  
  // Check if sort buttons exist
  if(!sortAlphaBtn || !sortChronoBtn) {
    console.error("Sort buttons not found");
    return;
  }

  // Dynamically load items from the container into the items array
  const assortment = document.getElementById('assortment');

  if(!assortment) {
    console.error("Assortment container not found");
    return;
  }

  const flexItems = Array.from(assortment.getElementsByClassName('flex-item'));

  // Check if any flex items exist
  if(flexItems.length === 0) {
    console.error("No flex items found");
    return;
  }

  const sortItems = (type) => {
    let sortedItems;
    if (type === 'alpha') {
      sortedItems = flexItems.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
    } else {
      sortedItems = flexItems.sort((a, b) => parseInt(a.dataset.year, 10) - parseInt(b.dataset.year, 10));
    }

    // Clear existing items from the container
    assortment.innerHTML = '';

    // Append sorted items back into the container
    sortedItems.forEach((item) => {
      assortment.appendChild(item);
    });
  };

  // Initial sort
  sortItems('alpha');
  sortAlphaBtn.classList.add('selected');

  // Safely update the total count if the element exists
  const totalMdFilesElement = document.getElementById('totalMdFiles');
  if (totalMdFilesElement) {
    totalMdFilesElement.innerText = flexItems.length;
  }

  // Button click events
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
