const padZero = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

const getDatesArray = (startDate, endDate) => {
  const addDays = (currentDate, days) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    return date;
  };

  const dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;
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

const getSpiceReportingRange = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let startMonth = currentMonth;
  let startYear = currentYear;

  let endMonth = currentMonth + 1;
  let endYear = currentYear;

  if (currentDay < 25) {
    if (currentMonth === 1) {
      startMonth = 12;
      endMonth = 1;
      startYear = currentYear - 1;
    } else {
      startMonth = currentMonth - 1;
      endMonth = currentMonth;
    }
  }

  if (currentDay >= 25 && currentMonth === 12) {
    startMonth = 12;
    endMonth = 1;
    endYear = currentYear + 1;
  }

  const startDate = new Date(startYear, startMonth, 25, 12, 0, 0);
  const endDate = new Date(endYear, endMonth, 25, 12, 0, 0);

  return { startDate, endDate };
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

  return { hours, minutes, seconds };
};

export {
  getDatesArray,
  getHours,
  getMinutes,
  getSeconds,
  getSpiceReportingRange,
  formatDateISOString,
  formatTimeInMs,
};
