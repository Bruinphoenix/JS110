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

console.log(substrings('abcde'));