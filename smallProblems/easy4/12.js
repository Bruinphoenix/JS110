function integerToString(int) {
  const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let intString = '';

  do {
    let digit = int % 10;
    intString = DIGITS[digit] + intString;
    int = Math.floor(int / 10);
  } while (int > 0);
  return intString;
}


function signedIntegerToString(int) {
  if (int === 0) {
    return '0'
  } else if (int < 0) {
    return `-${integerToString(int * -1)}`
  } else {
    return `+${integerToString(int)}`;
  }
}

console.log(signedIntegerToString(4321) === "+4321");
console.log(signedIntegerToString(-123) === "-123");
console.log(signedIntegerToString(0) === "0");