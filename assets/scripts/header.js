document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded event triggered');

    const toggleBio = document.querySelector('.toggle-bio');
    const bioExpand = document.querySelector('.bio-expand');
    const arrow = document.querySelector('.arrow');

    console.log('toggleBio:', toggleBio);
    console.log('bioExpand:', bioExpand);
    console.log('arrow:', arrow);

    if (toggleBio && bioExpand && arrow) {
        toggleBio.addEventListener('click', (e) => {
            console.log('toggleBio clicked');

            e.preventDefault();
            bioExpand.classList.toggle('hidden');
            if (bioExpand.classList.contains('hidden')) {
                toggleBio.textContent = 'Show more ↓';
            } else {
                toggleBio.textContent = 'Show less ↑';
            }
        });
    }
});
