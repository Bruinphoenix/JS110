function reverse(arr) {
  let reversed = []
  arr.forEach(element => { reversed.unshift(element); });
  arr.splice(0, Infinity, ...reversed)
  return arr;
}


let list = [1, 2, 3, 4];
let result = reverse(list);
console.log(result); // logs [4,3,2,1]
console.log(list === result)