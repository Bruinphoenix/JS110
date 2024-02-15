function isMultiple7(int) {
  return int % 7 === 0;
}

function isOdd(int) {
  return int % 2 === 1;
}

function noRepeatDigits(int) {
  let seenDigits = [];
  let noRepeats = true;
  String(int).split('').forEach(digit => {
    if (seenDigits.includes(digit)) {
      noRepeats = false;
    }
    seenDigits.push(digit);
  })
  return noRepeats;
}

function featured(int) {
  const MAX_FEATURED = 9876543201
  for (let index = int + 1; index <= MAX_FEATURED; index++) {
    if (isMultiple7(index) && noRepeatDigits(index) && isOdd(index)) {
      console.log(index);
      return index;
    }
  }
  console.log('There is no possible number that satisfies the conditions');
  return 'There is no possible number that satisfies the conditions';
}
featured(12);           // 21
featured(20);           // 21
featured(21);           // 35
featured(997);          // 1029
featured(1029);         // 1043
featured(999999);       // 1023547
featured(999999987);    // 1023456987
featured(9876543186);   // 9876543201
featured(9876543200);   // 9876543201
featured(9876543201);   // "There is no possible number that fulfills those requirements."