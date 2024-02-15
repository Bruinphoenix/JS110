const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

function letterPercentages(str) {
  let strArray = str.split('');
  let lowerCase = strArray.filter(element => {
    return (element === element.toLowerCase()) && util.isAlpha(element);
  })
  let upperCase = strArray.filter(element => {
    return (element === element.toUpperCase() && util.isAlpha(element));
  })
  let nonAlpha = strArray.filter(element => {
    return !util.isAlpha(element);
  })

  let result = {
    lowercase: (lowerCase.length * 100 / strArray.length).toFixed(2),
    uppercase: (upperCase.length * 100 / strArray.length).toFixed(2),
    neither: (nonAlpha.length * 100 / strArray.length).toFixed(2),
  }
  console.log(result);
}

letterPercentages('abCdef 123');
// { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }

letterPercentages('AbCd +Ef');
// { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }

letterPercentages('123');
// { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }