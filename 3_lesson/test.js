class Person {
  this.name = 'conor';
this.code = function () {
  console.log('coding')
};
Person.prototype.climb = function () {
  console.log('thats a big tree');
}
}

let me = new Person();

me.climb();

class DumbPerson extends Person() {

}

let dumbby = new DumbPerson();