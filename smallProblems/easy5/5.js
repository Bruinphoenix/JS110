function interleave(arr1, arr2) {
  let combinedArr = [];

  for (let index = 0; index < arr1.length; index++) {
    combinedArr.push(arr1[index], arr2[index]);
  }
  console.log(combinedArr);
  return combinedArr;
}

interleave([1, 2, 3], ['a', 'b', 'c'])