const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function isPalindrome(string) {
  return string === string.split('').reverse().join('');
}


function isRealPalindrome(string) {
  let cleanedString = '';

  for (const char of string) {
    if (util.isAlphanumeric(char)) {
      cleanedString += char.toLowerCase();
    }
  }
  //console.log(isPalindrome(cleanedString));
  return isPalindrome(cleanedString);
}

isRealPalindrome('madam');               // true
isRealPalindrome('Madam');               // true (case does not matter)
isRealPalindrome("Madam, I'm Adam");     // true (only alphanumerics matter)
isRealPalindrome('356653');              // true
isRealPalindrome('356a653');             // true
isRealPalindrome('123ab321');            // false