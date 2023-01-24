const rlSync = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

prompt("Welcome to Calculator!");

while (true) {
  prompt("Enter first number:");
  let num1 = rlSync.question();
  while (invalidNumber(num1)) {
    prompt("Please enter a valid number:");
    num1 = rlSync.question();
  }

  prompt("Enter second number:");
  let num2 = rlSync.question();
  while (invalidNumber(num2)) {
    prompt("Please enter a valid number:");
    num2 = rlSync.question();
  }

  prompt(
    "Enter type of operation:\n   1) Add 2) Subtract 3) Multiply 4) Divide"
  );
  let op = rlSync.question();
  while (invalidNumber(op) || Number(op) > 4) {
    prompt("Please enter a valid option:");
    op = rlSync.question();
  }

  let result, opSign;

  switch (op) {
    case "1":
      result = Number(num1) + Number(num2);
      opSign = "+";
      break;
    case "2":
      result = Number(num1) - Number(num2);
      opSign = "-";
      break;
    case "3":
      result = Number(num1) * Number(num2);
      opSign = "*";
      break;
    case "4":
      result = Number(num1) / Number(num2);
      opSign = "/";
      break;
  }

  prompt(`${num1} ${opSign} ${num2} = ${result}`);

  prompt("Would you like to perform another calculation? (y)es, (n)o");
  let againPrompt = rlSync.question();
  if (againPrompt.toLowerCase()[0] !== "y") return;
  console.log("----------\nNew Round\n----------");
}
