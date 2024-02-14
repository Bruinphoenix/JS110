const calls = {};

function fibonacci(n) {
  if (n <= 2) {
    return 1;
  }

  let minus2 = calls[n - 2] || fibonacci(n - 2);
  let minus1 = calls[n - 1] || fibonacci(n - 1);
  calls[n - 2] = minus2;
  calls[n - 1] = minus1;

  return minus1 + minus2;
}

console.log(
  fibonacci(1),       // 1
  fibonacci(2),       // 1
  fibonacci(3),       // 2
  fibonacci(4),       // 3
  fibonacci(5),      // 5
  fibonacci(12),      // 144
  fibonacci(20),      // 6765
)