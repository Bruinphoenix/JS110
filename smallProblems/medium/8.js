function fibonacci(n) {
  let first = 0;
  let second = 1;
  for (let index = 2; index <= n; index++) {
    [first, second] = [second, first + second];
  }
  return second;
}

console.log(
  fibonacci(20),       // 6765
  fibonacci(50),       // 12586269025
  fibonacci(75),       // 2111485077978050
)