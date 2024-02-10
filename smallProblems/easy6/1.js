function repeater(str) {
  let repeatedString = '';
  for (const char of str) {
    repeatedString += `${char}${char}`;
  }
  console.log(repeatedString);
  return repeatedString;
}
repeater('Hello');        // "HHeelllloo"
repeater('Good job!');    // "GGoooodd  jjoobb!!"
repeater('');             // ""