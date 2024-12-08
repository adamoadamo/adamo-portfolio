let mouseMoveTimeout;

// Function to detect if it's a touch device
function is_touch_device() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Function to fade images to low opacity
function fadeImages() {
    document.querySelectorAll('img').forEach(function(image) {
        image.classList.add('low-opacity');
    });
}

// Function to reset images to full opacity
function resetImages() {
    document.querySelectorAll('img').forEach(function(image) {
        image.classList.remove('low-opacity');
    });
}

// Apply behavior only for non-touch devices
if (!is_touch_device()) {
    // Listen for any mouse movement
    window.addEventListener('mousemove', function() {
        // Reset the images to full opacity when the mouse moves
        resetImages();

        // Clear the previous timeout (if the user moves the mouse again)
        clearTimeout(mouseMoveTimeout);

        // Set a timeout to fade the images after 2 seconds of no movement
        mouseMoveTimeout = setTimeout(fadeImages, 5000);  // 2000 milliseconds = 2 seconds
    });
}
