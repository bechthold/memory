const helpers = {
  timeToSeconds(time) {
    return Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]);
  },

  secondsToTime(seconds) {
    return (
      Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0') +
      ':' +
      (seconds % 60).toString().padStart(2, '0')
    );
  },
};
