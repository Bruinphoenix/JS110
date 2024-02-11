function rotateArray(arr) {
  if (!Array.isArray(arr) || !arr.length) return undefined;
  let arrayCopy = [...arr];
  arrayCopy.push(arrayCopy.shift());
  return arrayCopy;
}
let array = [1, 2, 3, 4];
// [2, 3, 4, 1]
console.log(rotateArray(array));