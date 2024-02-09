const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function wordSizes(string) {
  const wordsArray = string.split(' ');
  const wordLengths = {};


  for (const word of wordsArray) {
    if (word.length === 0) {
      continue;
    }

    if (wordLengths[String(word.length)]) {
      wordLengths[String(word.length)] += 1;
    } else {
      wordLengths[String(word.length)] = 1;
    }
  }
  console.log(wordLengths);
  return wordLengths;
}

wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 1, "7": 2 }
wordSizes("What's up doc?");                              // { "2": 1, "4": 1, "6": 1 }
wordSizes(''); 