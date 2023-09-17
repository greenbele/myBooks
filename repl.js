const l = require('lodash');;

class C1 {
  constructor() {
    this.title = 'react-eco';
    this.one = 1;
    this.three = 3;
  }

  get _two() {
    return this.two;
  }

  set _two(value) {
    this.two = `${this.title}/chapters/${value}/edit`;
  }
}

const c1 = new C1();

module.exports = {
  C1,
  c1,
};
