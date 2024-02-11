const WORD_TO_DIGIT = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

function wordToDigit(str) {
  let spliter = new RegExp(/(\W)/, 'gi')
  const words = str.split(spliter);
  return words
    .map(word => {
      if (WORD_TO_DIGIT[word]) {
        return WORD_TO_DIGIT[word];
      } else {
        return word;
      }
    })
    .join('');
}

let result = wordToDigit('Please call me at five five five one two three four. Thanks.');
console.log(result);