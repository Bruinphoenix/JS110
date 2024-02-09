const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function isPalindrome(string) {
  return string === string.split('').reverse().join('');
}

function isPalindromicNumber(int) {
  if (util.invalidNumber(int)) return undefined;

  const result = isPalindrome(String(int));
  console.log(result);
  return result;
}


isPalindromicNumber(4334);        // true
isPalindromicNumber(123210);       // false
isPalindromicNumber(22);           // true
isPalindromicNumber(5);            // true