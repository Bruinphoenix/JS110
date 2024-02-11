function buyFruit(arr) {
  return arr.map(fruitCount => {
    return Array(fruitCount[1]).fill(fruitCount[0]);
  }).flat();
}

console.log(buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]));