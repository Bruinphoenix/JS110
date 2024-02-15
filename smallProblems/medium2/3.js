function isValidTriangle(angArr) {
  if (angArr.includes(0)) return false;
  if (angArr.reduce((a, e) => a + e, 0) !== 180) return false;
  return true;
}

function triangleType(angArr) {
  if (angArr.includes(90)) return 'right';
  if (angArr.some(element => element > 90)) return 'obtuse';
  return 'acute';
}

function triangle(ang1, ang2, ang3) {
  let angles = [ang1, ang2, ang3].sort((a, b) => a - b);
  if (!isValidTriangle(angles)) return 'invalid';
  return triangleType(angles);
}

console.log(

  triangle(60, 70, 50),       // "acute"
  triangle(30, 90, 60),       // "right"
  triangle(120, 50, 10),      // "obtuse"
  triangle(0, 90, 90),        // "invalid"
  triangle(50, 50, 50),       // "invalid"

)