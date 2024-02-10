function reverseNumber(num) {
  return Number(String(num).split('').reverse().join(''))
}

console.log(
  reverseNumber(12345),    // 54321
  reverseNumber(12213),    // 31221
  reverseNumber(456),      // 654
  reverseNumber(12000),    // 21 -- Note that leading zeros in the result get dropped!
  reverseNumber(1),        // 1
)