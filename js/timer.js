let intervalId;
let startTime;

const timer = {
  updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;
    const minutes = Math.floor((elapsed / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((elapsed / 1000) % 60)
      .toString()
      .padStart(2, '0');
    settings.elements.timerText.textContent = `Your time: ${minutes}:${seconds}`;
    settings.timer = `${minutes}:${seconds}`;
  },

  startTimer() {
    startTime = Date.now();
    intervalId = setInterval(timer.updateTimer, 100);
  },

  stopTimer() {
    clearInterval(intervalId);
  },
};
