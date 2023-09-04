import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    remainingDays: document.querySelector('span[data-days]'),
    remainingHours: document.querySelector('span[data-hours]'),
    remainingMinutes: document.querySelector('span[data-minutes'),
    remainingSeconds: document.querySelector('span[data-seconds]'),
    inputDate: document.querySelector("#datetime-picker"),
};

refs.startBtn.disabled = true;
refs.startBtn.style.opacity = '0.9';

let remainingTime;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      //console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
          Notiflix.Notify.failure('Please choose a date in the future');
      }
      else {
          remainingTime = selectedDates[0] - new Date();
          refs.startBtn.disabled = false;
          refs.startBtn.style.opacity = '1';
      }
  },
};

flatpickr(refs.inputDate, options);

function startTime(remainingTime) {
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    refs.remainingDays.textContent = `${days}`;
    refs.remainingHours.textContent = `${hours}`;
    refs.remainingMinutes.textContent = `${minutes}`;
    refs.remainingSeconds.textContent = `${seconds}`;
};
const timer = {
  timerId: null,
    isActive: false,
    start() {
        if (this.isActive) {
            return;
        }
       this.isActive = true;
        this.timerId = setInterval(() => {
            refs.startBtn.style.opacity = '0.9';
            refs.startBtn.disabled = true;
            remainingTime -= 1000;
            startTime(remainingTime);        
        }, 1000);
    },
    stop() {
        clearInterval(this.timerId);
        this.isActive = false;
    },
};


refs.startBtn.addEventListener('click', () => {
    timer.start();
});

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
