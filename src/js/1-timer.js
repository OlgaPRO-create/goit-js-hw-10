
// flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from "../img/errorIcon.svg";

const datetimePickerElem = document.querySelector('#datetime-picker');
const btnStartElem = document.querySelector('[data-start]');
const daysSpanElem = document.querySelector('[data-days]');
const hoursSpanElem = document.querySelector('[data-hours]');
const minutesSpanElem = document.querySelector('[data-minutes]');
const secondsSpanElem = document.querySelector('[data-seconds]');

let userSelectedDate;
btnStartElem.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
//   userSelectedDate = Date.parse(userSelectedDates[0]);
 userSelectedDate = selectedDates[0].getTime();
  console.log(userSelectedDate);

  if(userSelectedDate < Date.now()) {
  iziToast.error( {
    message: 'Please choose a date in the future',
    messageColor: '#ffffff',
    backgroundColor:'#EF4040',
    progressBarColor: '#B51B1B',
    position:'topRight',
    iconUrl: errorIcon,
  });
  btnStartElem.disabled = true;
  } else {
    btnStartElem.disabled = false;
  } 
  },
};

flatpickr(datetimePickerElem, options);

btnStartElem.addEventListener('click', startTimer);

function startTimer() {
    btnStartElem.disabled = true;
    datetimePickerElem.disabled = true;
    const intervalId = setInterval(() => {
        let timeLeftMs = userSelectedDate - Date.now();

      function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const timeLeft = convertMs(timeLeftMs);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
daysSpanElem.textContent = addLeadingZero(timeLeft.days);
hoursSpanElem.textContent = addLeadingZero(timeLeft.hours);
minutesSpanElem.textContent = addLeadingZero(timeLeft.minutes);
secondsSpanElem.textContent = addLeadingZero(timeLeft.seconds);
if(timeLeft <= 1000) {
    clearInterval(intervalId);
    datetimePickerElem.disabled = false;
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  
}, 1000);

}


