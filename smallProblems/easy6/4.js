function sequence(int) {
  const countingUp = [];
  for (let index = 1; index <= int; index++) {
    countingUp.push(index);
  }
  console.log(countingUp);
  return countingUp;
}

sequence(5);    // [1, 2, 3, 4, 5]
sequence(3);    // [1, 2, 3]
sequence(1);    // [1]