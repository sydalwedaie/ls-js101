let rlSync = require('readline-sync');
let num1 = rlSync.question("Enter first number");
let num2 = rlSync.question("Enter second number");
let op = rlSync.question("Enter type of operation");

let result;

switch(op) {
  case '+':
    result = num1 + num2;
    break;
  case '-':
    result = num1 - num2;
    break;
  case '*':
    result = num1 * num2;
    break;
  case '/':
    result = num1 / num2;
    break;
  default:
    console.log("Operation not valid");
}

console.log(`${num1} ${op} ${num2} = ${result}`);
