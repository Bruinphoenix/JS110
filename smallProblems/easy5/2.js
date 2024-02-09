const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function union(arr1, arr2) {
  let allValues = arr1.concat(arr2);
  let filteredValues = [];
  for (const value of allValues) {
    if (!filteredValues.includes(value)) {
      filteredValues.push(value);
    }
  }
  console.log(filteredValues);
  return filteredValues;
}

union([1, 3, 5], [3, 6, 9]);