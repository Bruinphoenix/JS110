const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');


function runningTotal(arr) {
  const summedArray = [];
  let sum = 0;

  for (const element of arr) {
    summedArray.push(sum += element);
  }

  console.log(summedArray);
  return summedArray;
}

function mapRunningTotal(arr) {
  let sum = 0;
  let summedArray = arr.map((element) => {
    return sum += element;
  })
  console.log(summedArray);
  return summedArray;
}

runningTotal([2, 5, 13]);             // [2, 7, 20]
runningTotal([14, 11, 7, 15, 20]);    // [14, 25, 32, 47, 67]
runningTotal([3]);                    // [3]
runningTotal([]);                     // []

mapRunningTotal([2, 5, 13]);             // [2, 7, 20]
mapRunningTotal([14, 11, 7, 15, 20]);    // [14, 25, 32, 47, 67]
mapRunningTotal([3]);                    // [3]
mapRunningTotal([]);                     // []