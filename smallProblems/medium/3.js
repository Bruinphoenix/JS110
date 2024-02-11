

function maxRotation(int) {
  int = String(int);
  if (int.length === 1) {
    return int;
  } else if (int.length === 2) {
    return int[1] + int[0]
  }
  return Number(int.slice(1, 2) + maxRotation(int.slice(2) + int.slice(0, 1)));
}

console.log(
  maxRotation(735291),          // 321579

)