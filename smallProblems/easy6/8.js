function reverseWords(str) {
  const words = str.split(' ');
  return words.map(element => {
    if (element.length >= 5) {
      return element.split('').reverse().join('');
    } else {
      return element;
    }
  }).join(' ');
}



console.log(
  reverseWords('Professional'),             // "lanoisseforP"
  reverseWords('Walk around the block'),    // "Walk dnuora the kcolb"
  reverseWords('Launch School'),            // "hcnuaL loohcS"
)