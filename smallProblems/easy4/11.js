
function integerToString(int) {
  const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let intString = '';

  do {
    let digit = int % 10;
    intString = DIGITS[digit] + intString;
    int = Math.floor(int / 10);
  } while (int > 0);
  console.log(intString);
  return intString;
}

integerToString(4321);        // "4321"
integerToString(0);           // "0"
integerToString(5000);        // "5000"
integerToString(1234567890);  // "1234567890"