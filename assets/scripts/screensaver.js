let timer;

const setScreensaver = () => {
  document.body.classList.add('screensaver');
  console.log('Screensaver ON'); 
};

const resetScreensaver = () => {
  clearTimeout(timer);
  document.body.classList.remove('screensaver');
  console.log('Screensaver OFF'); 
  timer = setTimeout(setScreensaver, 10000); 
};

document.addEventListener('mousemove', resetScreensaver);
document.addEventListener('keydown', resetScreensaver);

resetScreensaver();
