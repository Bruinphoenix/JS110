const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;

function padZeros(str) {
  if (str.length === 1) {
    return '0' + str;
  } else {
    return str;
  }
}

function coterminalMinutes(int) {
  while (int < 0 || int > MINUTES_IN_DAY) {
    if (int < 0) {
      int += MINUTES_IN_DAY;
    } else {
      int -= MINUTES_IN_DAY;
    }
  }
  return int;
}

function timeOfDay(int) {
  int = coterminalMinutes(int);

  let minutes = String(int % MINUTES_IN_HOUR);
  let hours = String(Math.floor(int / MINUTES_IN_HOUR));
  let clockTime = `${padZeros(hours)}:${padZeros(minutes)}`
  console.log(clockTime);
  return clockTime;
}







console.log(timeOfDay(0) === "00:00");
console.log(timeOfDay(-3) === "23:57");
console.log(timeOfDay(35) === "00:35");
console.log(timeOfDay(-1437) === "00:03");
console.log(timeOfDay(3000) === "02:00");
console.log(timeOfDay(800) === "13:20");
console.log(timeOfDay(-4231) === "01:29");