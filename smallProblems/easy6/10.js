function isBalanced(str) {
  const chars = str.split('');
  let firstParen = '';
  let lastParen = '';
  let opening = 0;
  let closing = 0;

  chars.forEach(element => {
    if (element === '(' || element === ')') {
      //find and log the first parenthesis if one has not been found
      if (!firstParen) {
        firstParen = element;
      }

      lastParen = element;
      if (element === '(') {
        opening++;
      } else {
        closing++;
      }
    }
  });

  if ((firstParen !== '(' || lastParen !== ')') && (opening + closing) > 0) {
    return false;
  } else {
    return opening === closing;
  }
}

console.log(isBalanced("What (is) this?") === true);
console.log(isBalanced("What is) this?") === false);
console.log(isBalanced("What (is this?") === false);
console.log(isBalanced("((What) (is this))?") === true);
console.log(isBalanced("((What)) (is this))?") === false);
console.log(isBalanced("Hey!") === true);
console.log(isBalanced(")Hey!(") === false);
console.log(isBalanced("What ((is))) up(") === false);