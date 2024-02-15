function fridayThe13ths(year) {
  let thirteenths = [];
  for (let index = 1; index <= 12; index++) {
    let day = new Date(`${year}, ${index}, 13`);
    thirteenths.push(day.getDay())
  }
  return thirteenths.filter(element => element === 5).length
}

console.log(fridayThe13ths(1986));