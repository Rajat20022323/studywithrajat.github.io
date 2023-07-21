document.addEventListener('DOMContentLoaded', function() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const targetDateInput = document.getElementById('target-date');

  let targetDate;
  let timerInterval;

  function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      updateCountdownDisplay(0, 0, 0, 0);
      playAlarmSound(); // Play the alarm sound when time is up
    } else {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      updateCountdownDisplay(days, hours, minutes, seconds);
    }
  }

  function updateCountdownDisplay(days, hours, minutes, seconds) {
    daysEl.textContent = days;
    hoursEl.textContent = formatTime(hours);
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  function playAlarmSound() {
    // Add your alarm sound file (e.g., alarm.mp3) to the same folder as your HTML file.
    // Replace 'alarm.mp3' with the actual filename if needed.
    const audio = new Audio('alarm.mp3');
    audio.play();
  }

  startBtn.addEventListener('click', function() {
    const targetDateTime = new Date(targetDateInput.value).getTime();
    if (isNaN(targetDateTime)) return; // Invalid date input

    targetDate = targetDateTime;
    clearInterval(timerInterval);
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
  });

  pauseBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
  });
});
