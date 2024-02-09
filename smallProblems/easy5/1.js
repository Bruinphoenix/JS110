const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function dms(angle) {
  while (angle < 0 || angle > 360) {
    (angle > 0) ? angle += 360 : angle -= 360;
  }

  const MINUTES_PER_DEGREE = 60;
  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_DEGREE = SECONDS_PER_MINUTE * MINUTES_PER_DEGREE;

  let degrees = Math.floor(angle);
  let minutes = Math.floor((angle - degrees) * MINUTES_PER_DEGREE);
  let seconds = Math.floor(((angle - degrees - (minutes / MINUTES_PER_DEGREE)) * SECONDS_PER_DEGREE));

  let displayString = `${degrees}°${padZeroes(minutes)}'${padZeroes(seconds)}"`
  console.log(displayString);
  return displayString;
}

function padZeroes(number) {
  let numString = String(number);
  return numString.length < 2 ? ('0' + numString) : numString;
}

dms(30);           // 30°00'00"
dms(76.73);        // 76°43'48"
dms(254.6);        // 254°35'59"
dms(93.034773);    // 93°02'05"
dms(0);            // 0°00'00"
dms(360);          // 360°00'00" or 0°00'00"

dms(-1);   // 359°00'00"
dms(400);  // 40°00'00"
dms(-40);  // 320°00'00"
dms(-420); // 300°00'00"