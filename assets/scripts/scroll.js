// Smooth scrolling with easing
let isScrolling = false;
let targetScrollY = window.scrollY;
let currentScrollY = window.scrollY;
const ease = 0.075; // Adjust this value to change the smoothness (lower = smoother)

// Handle scroll events
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!isScrolling) {
        currentScrollY = window.scrollY;
    }
    targetScrollY = Math.max(0, Math.min(targetScrollY + e.deltaY, document.documentElement.scrollHeight - window.innerHeight));
    if (!isScrolling) {
        isScrolling = true;
        animate();
    }
}, { passive: false });

// Animation loop
function animate() {
    const diff = targetScrollY - currentScrollY;
    const delta = Math.abs(diff) < 0.1 ? diff : diff * ease;
    
    currentScrollY += delta;
    window.scrollTo(0, Math.round(currentScrollY));
    
    if (Math.abs(targetScrollY - currentScrollY) < 0.1) {
        isScrolling = false;
        return;
    }
    
    requestAnimationFrame(animate);
}

// Update scroll position on page load
document.addEventListener('DOMContentLoaded', () => {
    currentScrollY = window.scrollY;
    targetScrollY = window.scrollY;
}); 