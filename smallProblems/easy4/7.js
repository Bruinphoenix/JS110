const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');



function wordSizes(string) {
  let wordsArray = string.split(' ');
  wordsArray = wordsArray.map(element => {
    return element.toLowerCase().replace(/[^a-z0-9]/g, "")
  });
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

wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 2 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 3 }
wordSizes("What's up doc?");                              // { "2": 1, "3": 1, "5": 1 }
wordSizes('');