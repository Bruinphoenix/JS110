function leadingSubstrings(str) {
  let substrings = [];
  for (let index = 1; index <= str.length; index++) {
    substrings.push(str.slice(0, index));
  }
  return substrings;
}

console.log(leadingSubstrings('conor'))