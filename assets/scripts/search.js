function performSearch() {
    const query = document.getElementById('search-input').value;
    
    // Toggle the visibility of the "×" button based on whether the input field has any text
    document.getElementById('clear-search-btn').classList.toggle('hidden', !query);

    const items = document.querySelectorAll('#assortment .flex-item');
    
    // If the query is empty, reset the display of all items
    if (query.trim() === '') {
        items.forEach(item => {
            item.style.display = 'block';
        });
        return;
    }

    const results = fuse.search(query);
    console.log('Search results:', results); // log the results

    const resultsSet = new Set();
    results.forEach(result => {
        result.item.images.forEach(image => {
            resultsSet.add(image.url);
        });
        result.item.videos.forEach(video => {
            resultsSet.add(video.url);
        });
    });

    console.log('Results Set:', resultsSet); // log the set of results

    items.forEach(item => {
        const itemURL = item.getAttribute('data-url');
        if (resultsSet.has(itemURL)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

let fuse;

fetch('/index.json')
  .then(response => response.json())
  .then(data => {
    fuse = new Fuse(data, {
      keys: ['title', 'description', 'year', 'role', 'collaborators', 'images.caption', 'videos.caption'],
      threshold: 0.1
    });
    console.log('Fuse instance:', fuse); // log the Fuse instance
  });

// Add event listener to trigger search on input
document.getElementById('search-input').addEventListener('input', performSearch); 

// Add event listener to clear the search input when the "×" button is clicked
document.getElementById('clear-search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    performSearch();  // Trigger a new search to reset the display of all items
  });
