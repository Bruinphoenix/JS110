const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');


function multiplicativeAverage(arr) {
  if (!Array.isArray(arr)) return undefined;

  let product = 1;
  arr.forEach(element => {
    product *= element;
  })
  //console.log((product / arr.length));
  return (product / arr.length).toFixed(3);
}

multiplicativeAverage([3, 5]);                   // "7.500"
multiplicativeAverage([2, 5, 7, 11, 13, 17]);    // "28361.667"