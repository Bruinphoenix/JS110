function average(arr) {
  return Math.floor(arr.reduce((acumulator, current) =>
    acumulator + (current / arr.length),
    0));
}

console.log(
  average([9, 47, 23, 95, 16, 52]),
  average([1, 5, 87, 45, 8, 8])
);