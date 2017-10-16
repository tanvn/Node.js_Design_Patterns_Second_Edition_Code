"use strict";

function* twoWayGenerator() {
  const what = "hello, " + ( yield null);
  console.log('Hello ' + what);
}

const twoWay = twoWayGenerator();
console.log(twoWay.next());
console.log(twoWay.next('world'));
