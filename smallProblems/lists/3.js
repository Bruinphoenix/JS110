function numbericSort(int1, int2) {
  if (int1 > int2) {
    return 1;
  } else if (int2 > int1) {
    return -1;
  } else {
    return 0;
  }
}



function multiplyAllPairs(arr1, arr2) {
  let products = [];

  for (const element1 of arr1) {
    for (const element2 of arr2) {
      products.push(element1 * element2);
    }
  }
  return products.sort(numbericSort);
}

multiplyAllPairs([2, 4], [4, 3, 1, 2]);

