function padZero(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

const getHours = (time) => {
  const hours = parseInt((time / (1000 * 60 * 60)) % 24, 10);
  return padZero(hours);
};

const getMinutes = (time) => {
  const minutes = parseInt((time / (1000 * 60)) % 60, 10);
  return padZero(minutes);
};

const getSeconds = (time) => {
  const seconds = parseInt((time / 1000) % 60, 10);
  return padZero(seconds);
};

export {
  getHours,
  getMinutes,
  getSeconds,
};
