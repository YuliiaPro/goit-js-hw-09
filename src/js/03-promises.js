import Notiflix from 'notiflix';

const refs = {
  inputDelay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  button: document.querySelector('[type="submit"]'),
  form: document.querySelector('.form'),
}

refs.form.style.display = 'flex';
refs.form.style.alignItems = 'flex-end';
refs.form.style.gap = '10px';
refs.inputDelay.style.display = 'block';
refs.step.style.display = 'block';
refs.amount.style.display = 'block';
refs.button.style.height = '22px';

refs.button.addEventListener('click', onButtonSubmit);

function onButtonSubmit(evt) {
    
  evt.preventDefault();
  
  const inputDelay = Number(refs.inputDelay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  let delay = inputDelay;
  
  for (let i = 1; i <= amount; i += 1) {   
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = inputDelay + step * i;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
