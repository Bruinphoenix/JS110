/*
Write a program that solicits six numbers from the user
 and logs a message that describes whether the sixth number 
 appears among the first five numbers.
*/
const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');



function searcher() {
  const NUM_OF_PROMPTS = 5;
  const comparisonArray = [];
  const errorMessage = `Hmmm, that does not seem like a valid input, please try again: `

  for (let index = 0; index < NUM_OF_PROMPTS; index++) {
    const promptMessage = `Enter the ${util.selectIntWithSuffix(index + 1)} number: `;
    comparisonArray.push(util.getValidNumber(promptMessage, errorMessage, false));
  }

  const finalNumber = util.getValidNumber('Enter the final number: ', errorMessage, false);

  let doesArrContainNum = comparisonArray.includes(finalNumber) ? 'does' : 'does not';
  console.log(`The array ${comparisonArray} ${doesArrContainNum} contain ${finalNumber}`);
}

searcher();