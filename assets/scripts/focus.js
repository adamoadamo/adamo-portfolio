document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Content Loaded");
  
    const sortAlphaBtn = document.getElementById('sortAlpha');
    const sortChronoBtn = document.getElementById('sortChrono');
    const assortment = document.getElementById('assortment');
    const totalMdFiles = document.getElementById('totalMdFiles');
  
    if (!sortAlphaBtn || !sortChronoBtn || !assortment || !totalMdFiles) {
        console.log("Sort buttons or assortment or totalMdFiles not found");
        return;
    }
  
    console.log("Sort buttons found");
  
    let flexItems = Array.from(assortment.getElementsByClassName('flex-item'));
  
    if (flexItems.length === 0) {
        console.log("No flex items found");
        return;
    }
  
    console.log(`Found ${flexItems.length} flex items`);
  
    let currentIndex = 0;
  
    const toggleActiveClass = (event) => {
        const currentItem = event.currentTarget;
        currentIndex = flexItems.findIndex(item => item.querySelector('.navigable-item') === currentItem);
        flexItems.forEach(i => {
            const navigableItem = i.querySelector('.navigable-item');
            const imageCaption = navigableItem.querySelector('.image-caption');
            if (navigableItem !== currentItem) {
                navigableItem.classList.remove('active');
                if (imageCaption) {
                    imageCaption.style.opacity = "0";
                    imageCaption.style.display = "none";
                }
            }
        });
        currentItem.classList.toggle('active');
        currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        const imageCaption = currentItem.querySelector('.image-caption');
        if (imageCaption) {
            if (currentItem.classList.contains('active')) {
                imageCaption.style.display = "block";
                imageCaption.style.opacity = "1";
            } else {
                imageCaption.style.display = "none";
                imageCaption.style.opacity = "0";
            }
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
  
    registerNavigation();
    registerClickToToggle();
  
    document.addEventListener('keydown', function (event) {
        console.log(`Keydown event: ${event.key}`);
  
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            const activeItem = flexItems[currentIndex].querySelector('.navigable-item');
            const activeItemCaption = activeItem ? activeItem.querySelector('.image-caption') : null;
            if (activeItem) {
                activeItem.classList.remove('active');
                if (activeItemCaption) {
                    activeItemCaption.style.display = "none";
                    activeItemCaption.style.opacity = "0";
                }
            }
  
            currentIndex = event.key === 'ArrowRight'
                ? (currentIndex + 1) % flexItems.length
                : (currentIndex - 1 + flexItems.length) % flexItems.length;
  
            const newActiveItem = flexItems[currentIndex].querySelector('.navigable-item');
            const newActiveItemCaption = newActiveItem ? newActiveItem.querySelector('.image-caption') : null;
            if (newActiveItem) {
                newActiveItem.classList.add('active');
                if (newActiveItemCaption) {
                    newActiveItemCaption.style.display = "block";
                    newActiveItemCaption.style.opacity = "1";
                }
                newActiveItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
        }
    });
  
    const sortItems = (type) => {
        let sortedItems;
        if (type === 'alpha') {
            sortedItems = flexItems.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
        } else {
            sortedItems = flexItems.sort((a, b) => parseInt(b.dataset.year, 10) - parseInt(a.dataset.year, 10));
        }
        assortment.innerHTML = '';
        sortedItems.forEach((item) => {
            assortment.appendChild(item);
        });
        registerNavigation();
        registerClickToToggle();
    };
  
    sortItems('alpha');
    sortAlphaBtn.classList.add('selected');
    totalMdFiles.innerText = flexItems.length;
  
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