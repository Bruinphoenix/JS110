const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function leadingSubstrings(str) {
  const ALL_CHARS = str.split('');
  const subStrings = [];
  let currentString = '';

  ALL_CHARS.forEach(element => {
    currentString += element;
    subStrings.push(currentString);
  });
  return subStrings;
}

function substrings(str) {
  const allSubstrings = [];
  for (let index = 0; index < str.length; index++) {
    allSubstrings.push(leadingSubstrings(str.slice(index)));
  }
  return allSubstrings.flat();
}



function isPalindrome(string) {
  return ((string === string.split('').reverse().join(''))
    && (string.length > 1));
}


function palindromes(str) {
  const subStrings = substrings(str).flat();
  return subStrings.filter(isPalindrome);
}
console.log(palindromes('madam'));