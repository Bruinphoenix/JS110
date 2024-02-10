function multiplyList(arr1, arr2) {
  return arr1.map((element, index) => {
    return element * arr2[index];
  });
}

// [27, 50, 77]
console.log(multiplyList([3, 5, 7], [9, 10, 11]));