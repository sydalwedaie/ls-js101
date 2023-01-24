const rlSync = require("readline-sync");
let messages = require("./calculator_messages.json");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

prompt(messages.welcom);

while (true) {
  prompt(messages.num1);
  let num1 = rlSync.question();
  while (invalidNumber(num1)) {
    prompt(messages.validNum);
    num1 = rlSync.question();
  }

  prompt(messages.num2);
  let num2 = rlSync.question();
  while (invalidNumber(num2)) {
    prompt(messages.validNum);
    num2 = rlSync.question();
  }

  prompt(messages.operation);
  let op = rlSync.question();
  while (invalidNumber(op) || Number(op) > 4) {
    prompt(messages.validOption);
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

  prompt(messages.again);
  let againPrompt = rlSync.question();
  if (againPrompt.toLowerCase()[0] !== "y") return;
  prompt(messages.newRound);
}
