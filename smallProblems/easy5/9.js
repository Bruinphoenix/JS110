function countOccurrences(arr) {
  const counter = {};

  for (const element of arr) {
    if (counter[element.toLowerCase()]) {
      counter[element.toLowerCase()] += 1;
    } else {
      counter[element.toLowerCase()] = 1;
    }
  }
  console.log(counter);
}

let vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'truck',
  'motorcycle', 'suv', 'motorcycle', 'car', 'truck'];

countOccurrences(vehicles);