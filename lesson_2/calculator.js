const rlSync = require('readline-sync');

console.log('\nWelcome to Calculator!');
console.log('----------------------------');

let num1 = Number(rlSync.question("Enter first number:\n"));
let num2 = Number(rlSync.question("Enter second number:\n"));
let op = rlSync.question("Enter type of operation:\n1) Add 2) Subtract 3) Multiply 4) Divide\n");

let result;
let opSign;

switch (op) {
  case '1':
    result = num1 + num2;
    opSign = '+';
    break;
  case '2':
    result = num1 - num2;
    opSign = '-';
    break;
  case '3':
    result = num1 * num2;
    opSign = '*';
    break;
  case '4':
    result = num1 / num2;
    opSign = '/';
    break;
  default:
    console.log("Operation not valid");
}

console.log('----------------------------');
if (opSign) console.log(`${num1} ${opSign} ${num2} = ${result}`);

