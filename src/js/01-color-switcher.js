function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
  body: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

refs.buttonStart.style.position = 'absolute';
refs.buttonStart.style.top = '50%';
refs.buttonStart.style.left = '45%';
refs.buttonStart.style.transform = 'translate(-50%, -50%)';
refs.buttonStart.style.marginRight = '120px';
refs.buttonStart.style.fontSize = '20px';
refs.buttonStart.style.padding = '10px';
refs.buttonStart.style.width = '100px';
refs.buttonStart.style.textTransform = 'uppercase';
  
refs.buttonStop.style.position = 'absolute';
refs.buttonStop.style.top = '50%';
refs.buttonStop.style.left = '45%';
refs.buttonStop.style.transform = 'translate(-50%, -50%)';
refs.buttonStop.style.marginLeft = '120px';
refs.buttonStop.style.fontSize = '20px';
refs.buttonStop.style.padding = '10px';
refs.buttonStop.style.width = '100px';
refs.buttonStop.style.textTransform = 'uppercase';

const changeColor = {
  timerId: null,
    isActive: false,
    start() {
        if (this.isActive) {
        return;
        }
      this.isActive = true;
      refs.buttonStart.style.opacity = '0.8';
      refs.buttonStart.disabled = true;
      refs.buttonStop.style.opacity = '1';
      refs.buttonStop.disabled = false;
      this.timerId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();       
      }, 1000);
  },
    
    stop() {
    clearInterval(this.timerId);
    this.isActive = false;
    refs.buttonStop.style.opacity = '0.8';
    refs.buttonStop.disabled = true;
    refs.buttonStart.style.opacity = '1';
    refs.buttonStart.disabled = false;
    },
};

refs.buttonStart.addEventListener('click', () => {
    changeColor.start();
});

refs.buttonStop.addEventListener('click', () => {
    changeColor.stop();
});