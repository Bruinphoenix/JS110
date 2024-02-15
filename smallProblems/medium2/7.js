function bubbleSort(arr) {
  for (let index = arr.length - 1; index >= 0; index--) {
    let noChanges = true;
    for (let sortIndex = 0; sortIndex < index; sortIndex++) {
      let currentVal = arr[sortIndex];
      let nextVal = arr[sortIndex + 1];
      if (currentVal > nextVal) {
        [arr[sortIndex], arr[sortIndex + 1]] = [nextVal, currentVal];
        noChanges = false;
      }
    }
    if (noChanges) return arr;
  }
  return arr
}

let array = [2, 22, 11, 5, 3, 6, 19, 33];
console.log(bubbleSort(array));