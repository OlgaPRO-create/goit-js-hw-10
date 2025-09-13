// iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from '../img/errorIcon.svg';
import sucessIcon from '../img/success.svg';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', event => {
    event.preventDefault();
const promiseDelay = Number(formElem.delay.value);
const stateValue = formElem.state.value;

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
  if (stateValue === 'fulfilled') {
    resolve(promiseDelay);
  } else {
    reject(promiseDelay);
  }
}, promiseDelay);
});

promise
.then(promiseDelay => {
    iziToast.success({
     iconUrl: sucessIcon,
     message: `Fulfilled promise in ${promiseDelay}ms`,
     messageColor: '#ffffff',
     backgroundColor: '#59A10D',
     progressBarColor: '#326101',
     progressBarEasing: 'linear',
     position: 'topRight',
    });
})
.catch(promiseDelay => {
iziToast.error({
    iconUrl: errorIcon,
    message: `Rejected promise in ${promiseDelay}ms`,
    messageColor: '#ffffff',
     backgroundColor: '#EF4040',
     progressBarColor: '#B51B1B',
     progressBarEasing: 'linear',
     position: 'topRight'
});
});
formElem.reset();
});
