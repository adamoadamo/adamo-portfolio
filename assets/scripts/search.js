let fuse;

// Wait for Fuse to be available
function waitForFuse() {
    return new Promise((resolve) => {
        const check = () => {
            if (window.Fuse) {
                resolve(window.Fuse);
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    });
}

function performSearch() {
    if (!fuse) return; // Don't perform search if fuse isn't initialized
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search-btn');
    
    if (!searchInput || !clearButton) return;
    
    const query = searchInput.value;
    clearButton.classList.toggle('hidden', !query);

    const items = document.querySelectorAll('#assortment .flex-item');
    
    if (query.trim() === '') {
        items.forEach(item => {
            item.style.display = 'block';
        });
        return;
    }

    const results = fuse.search(query);
    const resultsSet = new Set();
    results.forEach(result => {
        result.item.images.forEach(image => {
            resultsSet.add(image.url);
        });
        result.item.videos.forEach(video => {
            resultsSet.add(video.url);
        });
    });

    items.forEach(item => {
        const itemURL = item.getAttribute('data-url');
        if (resultsSet.has(itemURL)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize search functionality
async function initializeSearch() {
    try {
        await waitForFuse(); // Wait for Fuse to be available
        const response = await fetch('/index.json');
        const data = await response.json();
        fuse = new Fuse(data, {
            keys: ['title', 'description', 'year', 'role', 'collaborators', 'images.caption', 'videos.caption', 'tags', 'location', 'alt'],
            threshold: 0.1
        });
    } catch (error) {
        console.error('Error initializing search:', error);
    }
}

// Add event listeners only if elements exist
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch(); // Start initialization

    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search-btn');

    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                performSearch();
            }
        });
    }
});
