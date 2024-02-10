function afterMidnight(str) {
  const MINUTES_IN_HOUR = 60;
  const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
  let hourMinute = str.split(':')
  let minutesPastMidnight = Number(hourMinute[0]) * MINUTES_IN_HOUR + Number(hourMinute[1]);
  //console.log(minutesPastMidnight);
  if (minutesPastMidnight === MINUTES_IN_DAY) {
    return 0;
  }
  return minutesPastMidnight;
}

function beforeMidnight(str) {
  const MINUTES_IN_HOUR = 60;
  const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
  let [hour, minute] = str.split(':')
  let minutesPastMidnight = Number(hour) * MINUTES_IN_HOUR + Number(minute);
  let minutesBeforeMidnight = MINUTES_IN_DAY - minutesPastMidnight;
  //console.log(minutesBeforeMidnight);
  if (minutesPastMidnight === 0) {
    return 0;
  }
  return minutesBeforeMidnight;
}



console.log(afterMidnight("00:00") === 0);
console.log(beforeMidnight("00:00") === 0);
console.log(afterMidnight("12:34") === 754);
console.log(beforeMidnight("12:34") === 686);
console.log(afterMidnight("24:00") === 0);
console.log(beforeMidnight("24:00") === 0);