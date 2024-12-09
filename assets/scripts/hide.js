let mouseMoveTimeout;
let currentFilter = null;

// Function to detect if it's a touch device
function is_touch_device() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Function to generate random RGB values as decimals
function randomRGBColor() {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    };
}

// Function to wrap media in container
function wrapMedia() {
    document.querySelectorAll('img, video').forEach(function(media) {
        if (!media.parentElement.classList.contains('media-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('media-wrapper');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';
            
            // Clone the media element for the overlay
            const mediaClone = media.cloneNode(true);
            mediaClone.classList.add('duotone-media');
            mediaClone.style.position = 'absolute';
            mediaClone.style.top = '0';
            mediaClone.style.left = '0';
            mediaClone.style.width = '100%';
            mediaClone.style.height = '100%';
            mediaClone.style.opacity = '0';
            mediaClone.style.transition = 'opacity 0.5s ease-in-out';
            mediaClone.style.pointerEvents = 'none';
            
            if (media.tagName.toLowerCase() === 'video') {
                mediaClone.muted = true;
                mediaClone.playbackRate = media.playbackRate;
                // Sync playback between original and clone
                media.addEventListener('play', () => mediaClone.play());
                media.addEventListener('pause', () => mediaClone.pause());
                media.addEventListener('timeupdate', () => {
                    if (Math.abs(mediaClone.currentTime - media.currentTime) > 0.1) {
                        mediaClone.currentTime = media.currentTime;
                    }
                });
            }
            
            media.parentNode.insertBefore(wrapper, media);
            wrapper.appendChild(media);
            wrapper.appendChild(mediaClone);
        }
    });
}

// Function to apply duotone effect
function applyDuotone() {
    const filterId = 'duotone-filter-' + Date.now();
    const shadow = randomRGBColor();
    const highlight = randomRGBColor();
    
    // Remove any existing filters
    if (currentFilter) {
        currentFilter.remove();
    }
    
    // Create new SVG filter
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.display = 'none';
    svg.innerHTML = `
        <defs>
            <filter id="${filterId}">
                <feColorMatrix type="matrix"
                    values="0.333 0.333 0.333 0 0
                            0.333 0.333 0.333 0 0
                            0.333 0.333 0.333 0 0
                            0 0 0 1 0" />
                
                <feComponentTransfer color-interpolation-filters="sRGB">
                    <feFuncR type="table" tableValues="${shadow.r} ${highlight.r}"/>
                    <feFuncG type="table" tableValues="${shadow.g} ${highlight.g}"/>
                    <feFuncB type="table" tableValues="${shadow.b} ${highlight.b}"/>
                </feComponentTransfer>
            </filter>
        </defs>
    `;
    document.body.appendChild(svg);
    currentFilter = svg;
    
    // Apply filter to cloned media
    document.querySelectorAll('.duotone-media').forEach(function(media) {
        media.style.filter = `url(#${filterId})`;
        media.style.opacity = '1';
    });
}

// Function to reset media
function resetMedia() {
    document.querySelectorAll('.duotone-media').forEach(function(media) {
        media.style.opacity = '0';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Apply behavior only for non-touch devices
    if (!is_touch_device()) {
        // Wrap all media in containers
        wrapMedia();

        // Start initial effect after delay
        setTimeout(applyDuotone, 1000);

        // Listen for any mouse movement
        window.addEventListener('mousemove', function() {
            resetMedia();
            clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(applyDuotone, 4000);
        });
    }
});
