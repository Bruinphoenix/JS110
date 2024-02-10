function swapName(str) {
  let names = str.split(' ')
  let lastName = names.splice(-1)
  return lastName + ', ' + names.join(' ');
}

console.log(swapName('Karl Oskar Henriksson Ragvals'));