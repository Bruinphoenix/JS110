function sum(int) {
  return String(int).split('').reduce((acc, element) => acc += Number(element), 0);
}

console.log(
  sum(23),           // 5
  sum(496),          // 19
  sum(123456789)    // 45
)