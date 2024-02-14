function fibonacci(n) {
  if (n <= 2) {
    return 1
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
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