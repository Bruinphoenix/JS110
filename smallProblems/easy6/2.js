const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function doubleConsonants(str) {
  let repeatedString = '';

  for (const char of str) {
    if (util.isAlpha(char) && !VOWELS.includes(char.toLowerCase())) {
      repeatedString += `${char}${char}`;
    } else {
      repeatedString += char;
    }
  }
  console.log(repeatedString);
  return repeatedString;
}


doubleConsonants('String');          // "SSttrrinngg"
doubleConsonants('Hello-World!');    // "HHellllo-WWorrlldd!"
doubleConsonants('July 4th');        // "JJullyy 4tthh"
doubleConsonants('');                // ""