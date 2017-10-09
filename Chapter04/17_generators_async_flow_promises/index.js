"use strict";

const fs = require('fs');
const path = require('path');
const utilities = require('./utilities');
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

function asyncFlowWithThunks(generatorFunction) {
  function onRejected(err){
    return generator.throw(err); 
  }

  function onFulfilled(res) {
    // console.log("result onFulfilled " + res);
    // const results = [].slice.call(arguments, 1);
    const { done, value } = generator.next(res);
    console.log("done", done, "value", value);
    if(!done) {
      value.then(onFulfilled, onRejected); 
    }
  }
  const generator = generatorFunction();
  const {done, value} = generator.next();
  if(!done) { value.then(onFulfilled, onRejected) };
}


asyncFlowWithThunks(function* () {
  const fileName = path.basename(__filename);
  const myself = yield readFile(fileName, 'utf8');
  yield writeFile(`clone_of_${fileName}`, myself);
  console.log('Clone created');
});
