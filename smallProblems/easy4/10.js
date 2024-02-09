function stringToSignedInteger(string) {
  const digitArray = string.split('');
  let numericPlaceMultiplyer = 1;
  let returnInt = 0;
  let negativeInt = false;
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
    if (digitArray[index] === '-' || digitArray[index] === '+') {
      if (digitArray[index] === '-') {
        negativeInt = true;
      }
      continue;
    }

    let digit = digitArray[index];
    digit = DIGITS[digit];

    returnInt += (digit * numericPlaceMultiplyer);
    numericPlaceMultiplyer *= 10;
  }

  if (negativeInt) {
    return returnInt * (-1);
  }
  return returnInt;
}


console.log(stringToSignedInteger("4321") === 4321); // logs true
console.log(stringToSignedInteger("-570") === -570); // logs true
console.log(stringToSignedInteger("+100") === 100); // logs true