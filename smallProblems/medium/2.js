function rotateArray(arr) {
  if (!Array.isArray(arr) || !arr.length) return undefined;
  let arrayCopy = [...arr];
  arrayCopy.push(arrayCopy.shift());
  return arrayCopy;
}

function rotateRightmostDigits(number, placesFromRight) {
  let digits = String(number).split('');
  let sliceIndex = digits.length - placesFromRight;

  let unrotated = digits.slice(0, sliceIndex);
  let rotated = rotateArray(digits.slice(sliceIndex));
  return Number(unrotated.concat(rotated).join(''));
}
console.log(
  rotateRightmostDigits(735291, 1),      // 735291
  rotateRightmostDigits(735291, 2),      // 735219
  rotateRightmostDigits(735291, 3),      // 735912
  rotateRightmostDigits(735291, 4),      // 732915
  rotateRightmostDigits(735291, 5),      // 752913
  rotateRightmostDigits(735291, 6),      // 352917
)