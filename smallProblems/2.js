const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');
/*


*/

function isPalindrome(string) {
  if (string.length % 2 === 0) {
    let firstHalf = string.slice(0, string.length / 2);
    let secondHalf = string.slice(string.length / 2);
    console.log(firstHalf, secondHalf);
    secondHalf = secondHalf.split('').reverse().join('');
    return firstHalf === secondHalf;
  } else {
    let firstHalf = string.slice(0, string.length / 2);
    let secondHalf = string.slice((string.length / 2) + 1);
    console.log(firstHalf, secondHalf);
    secondHalf = secondHalf.split('').reverse().join('');
    return firstHalf === secondHalf;
  }
}


isPalindrome('asddsa');