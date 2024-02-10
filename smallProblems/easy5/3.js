function halvsies(arr) {
  let midIndex = Math.ceil(arr.length / 2);
  let firstHalf = arr.slice(0, midIndex);
  let secondHalf = arr.slice(midIndex);
  let returnArr = [firstHalf, secondHalf];
  console.log(returnArr);
  return returnArr;
}

halvsies([1, 2, 3, 4]);       // [[1, 2], [3, 4]]
halvsies([1, 5, 2, 4, 3]);    // [[1, 5, 2], [4, 3]]
halvsies([5]);                // [[5], []]
halvsies([]);                 // [[], []]