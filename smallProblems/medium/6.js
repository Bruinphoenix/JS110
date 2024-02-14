function findFibonacciIndexByLength(digits) {
  let previousNumber = 1n;
  let currentNumber = 1n;
  for (let index = 2n; true; index++) {
    if (BigInt(String(currentNumber).length) === digits) {
      return index;
    }
    else {
      let nextNumber = previousNumber + currentNumber;
      previousNumber = currentNumber;
      currentNumber = nextNumber;
    }
  }
}

console.log(findFibonacciIndexByLength(2n) === 7n,    // 1 1 2 3 5 8 13
  findFibonacciIndexByLength(3n) === 12n,  // 1 1 2 3 5 8 13 21 34 55 89 144
  findFibonacciIndexByLength(10n) === 45n,
  findFibonacciIndexByLength(16n) === 74n,
  findFibonacciIndexByLength(100n) === 476n,
  findFibonacciIndexByLength(1000n) === 4782n,
  findFibonacciIndexByLength(10000n) === 47847n
)