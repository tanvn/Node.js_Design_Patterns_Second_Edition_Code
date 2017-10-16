"use strict";

const promisify = require('./promisify.js');

const delayedDivision = (dividend, divisor, cb) => {
  setTimeout(() => {
    if (
      typeof dividend !== 'number' ||
      typeof divisor !== 'number' ||
      divisor === 0
    ){
      cb(new Error('Invalid operands'));
    }

    cb(null, dividend/divisor);
  }, 1000);
};

const validateEmail = (email, cb) => {
  setTimeout(() => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)) {
      cb(null, email);
    }else {
      console.log("not a valid email !!!")
      cb(new Error("not an email !"));
    }
  }, 1000);
}


const promisifiedDivision = promisify(delayedDivision);
const promisifiedEmailChecker = promisify(validateEmail);
promisifiedEmailChecker("tanvn@gmail.com." )
  .then(value => console.log("email: "+ value))
  .catch((error) => console.log(error));

promisifiedDivision(10, 2)
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
;

promisifiedDivision(10, 0)
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
;
