function triangle(side1, side2, side3) {
  let sideLengths = [side1, side2, side3].sort((a, b) => a - b);
  if (sideLengths.includes(0)) return 'invalid';
  if (sideLengths[0] + sideLengths[1] < sideLengths[2]) return 'invalid';
  if (sideLengths[0] === sideLengths[1] && sideLengths[1] === sideLengths[2]) return 'equilateral';
  if (sideLengths[0] === sideLengths[1] || sideLengths[1] === sideLengths[2]) return 'isosceles';
  return 'scalene';
}

console.log(
  triangle(3, 3, 3),        // "equilateral"
  triangle(3, 3, 1.5),      // "isosceles"
  triangle(3, 4, 5),        // "scalene"
  triangle(0, 3, 3),        // "invalid"
  triangle(3, 1, 1),        // "invalid"
)