const rlSync = require("readline-sync");
let messages = require("./calculator_messages.json");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

let lang = rlSync.question("=> 1) en 2) es 3) fr\n");
while (!["1", "2", "3"].includes(lang)) {
  lang = rlSync.question("=> 1) en 2) es 3) fr\n");
}

switch (lang) {
  case "1":
    lang = "en";
    break;
  case "2":
    lang = "es";
    break;
  case "3":
    lang = "fr";
    break;
}

prompt(messages[lang].welcome);

while (true) {
  prompt(messages[lang].num1);
  let num1 = rlSync.question();
  while (invalidNumber(num1)) {
    prompt(messages[lang].validNum);
    num1 = rlSync.question();
  }

  prompt(messages[lang].num2);
  let num2 = rlSync.question();
  while (invalidNumber(num2)) {
    prompt(messages[lang].validNum);
    num2 = rlSync.question();
  }

  prompt(messages[lang].operation);
  let op = rlSync.question();
  while (invalidNumber(op) || Number(op) > 4) {
    prompt(messages[lang].validOption);
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

  prompt(messages[lang].again);
  let againPrompt = rlSync.question();
  if (againPrompt.toLowerCase()[0] !== "y") return;
  prompt(messages[lang].newRound);
}
