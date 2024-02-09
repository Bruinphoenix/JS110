const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');
/*


*/

function isPalindrome(string) {
  return string === string.split('').reverse().join('');
}

let a = isPalindrome('madam');               // true
let b = isPalindrome('Madam');               // false (case matters)
let c = isPalindrome("madam i'm adam");      // false (all characters matter)
let d = isPalindrome('356653');

console.log(a, b, c, d);