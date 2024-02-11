function reverseSentence(str) {
  return str.split(' ').reverse().join(' ');
}

console.log(
  reverseSentence(''),                       // ""
  reverseSentence('Hello World'),            // "World Hello"
  reverseSentence('Reverse these words')    // "words these Reverse"
)