const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function stringToInteger(string) {
  const digitArray = string.split('');
  let numericPlaceMultiplyer = 1;
  let returnInt = 0;
  const DIGITS = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  }

  for (let index = digitArray.length - 1; index >= 0; index--) {
    let digit = digitArray[index];
    digit = DIGITS[digit];

    returnInt += (digit * numericPlaceMultiplyer);
    numericPlaceMultiplyer *= 10;
  }
  return returnInt;
}

console.log(stringToInteger("4321") === 4321); // logs true
console.log(stringToInteger("570") === 570); // logs true
