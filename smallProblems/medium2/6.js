function sumSquares(int) {
  let upToInt = new Array(int).fill(0).map((_, index) => index + 1);
  return upToInt.map(element => element ** 2).reduce((acc, ele) => acc + ele, 0)
}

function squareSums(int) {
  let upToInt = new Array(int).fill(0).map((_, index) => index + 1);
  return upToInt.reduce((acc, ele) => acc + ele, 0) ** 2;
}

function sumSquareDifference(int) {
  return squareSums(int) - sumSquares(int);
}


console.log(

  sumSquareDifference(3),      // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
  sumSquareDifference(10),     // 2640
  sumSquareDifference(1),     // 0
  sumSquareDifference(100),    // 25164150

)