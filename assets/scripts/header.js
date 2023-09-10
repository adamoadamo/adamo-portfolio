document.addEventListener('DOMContentLoaded', (event) => {
    const toggleBio = document.querySelector('.toggle-bio');
    const bioExpand = document.querySelector('.bio-expand');
    const arrow = document.querySelector('.arrow');

    toggleBio.addEventListener('click', (e) => {
        e.preventDefault();
        bioExpand.classList.toggle('hidden');
        if (bioExpand.classList.contains('hidden')) {
            toggleBio.textContent = 'Show more ↓';
        } else {
            toggleBio.textContent = 'Show less ↑';
        }
    });
});