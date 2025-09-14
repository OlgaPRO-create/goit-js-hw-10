// flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// iziToastzitoast
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
    userSelectedDate = selectedDates[0].getTime();

    if (userSelectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        position: 'topRight',
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

    if (timeLeftMs <= 0) {
      clearInterval(intervalId);
      datetimePickerElem.disabled = false;

      daysSpanElem.textContent = "00";
      hoursSpanElem.textContent = "00";
      minutesSpanElem.textContent = "00";
      secondsSpanElem.textContent = "00";
      return; // важливо, щоб не рахувало далі
    }

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
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

  }, 1000);
}
