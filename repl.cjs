const l = require('lodash');;

class C1 {
  constructor() {
    this.title = 'react-eco';
    this.one = 1;
    this.three = 3;
    this.arr = [1, 2, 3, 4, 5];
  }

  get _two() {
    return this.two;
  }

  set _two(value) {
    this.two = `${this.title}/chapters/${value}/edit`;
  }

  testThis() {
    return this.arr.map((el) => {
      return this.three;
    });
  }
}

testObj = [{n: 45, x: 20}, {n: 370, x: 449}, {n: 0, x: 1999}];

const c1 = new C1();

module.exports = {
  C1,
  c1,
  testObj,
  l,
};
