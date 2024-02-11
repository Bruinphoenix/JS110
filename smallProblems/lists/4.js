function leadingSubstrings(str) {
  const ALL_CHARS = str.split('');
  const subStrings = [];
  let currentString = '';

  ALL_CHARS.forEach(element => {
    currentString += element;
    subStrings.push(currentString);
  });
  console.log(subStrings);
  return subStrings;
}

leadingSubstrings('abc');      // ["a", "ab", "abc"]
leadingSubstrings('a');        // ["a"]
leadingSubstrings('xyzzy');    // ["x", "xy", "xyz", "xyzz", "xyzzy"]