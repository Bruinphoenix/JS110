const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function swap(string) {
  const words = string.split(' ');
  const swappedStrings = [];

  for (const word of words) {
    if (word.length === 1) {
      swappedStrings.push(word);
      continue;
    }

    const lastChar = word[word.length - 1];
    const firstChar = word[0];
    swappedStrings.push(lastChar + word.slice(1, -1) + firstChar);
  }
  result = swappedStrings.join(' ');
  console.log(result);
  return result;
}

swap('Oh what a wonderful day it is');  // "hO thaw a londerfuw yad ti si"
swap('Abcde');                          // "ebcdA"
swap('a');                              // "a"