const padZero = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

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

const formatDateISOString = (isoValue) => {
  const date = new Date(isoValue);
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

const formatTimeInMs = (milliseconds) => {
  const hours = getHours(milliseconds);
  const minutes = getMinutes(milliseconds);
  const seconds = getSeconds(milliseconds);

  return `${hours}:${minutes}:${seconds}`;
};

export {
  getHours,
  getMinutes,
  getSeconds,
  formatDateISOString,
  formatTimeInMs,
};
