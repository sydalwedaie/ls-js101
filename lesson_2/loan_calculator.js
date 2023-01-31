const rlSync = require("readline-sync");

let principal = 0;
let monthlyRate = 0;
let durationMonths = 0;
let monthlyPayment = 0;
let totalPayment = 0;
let totalInterest = 0;

let messages = {
  welcom: "Welcome to Loan Calculator!",
  enterAmount: "Please enter the loan amount in USD:",
  exampleAmount: "Example: 10000 means $10,000",
  enterRate: "Please enter the APR in percentage points:",
  exampleRate: "Example: 4.2 means 4.2%",
  specifyDuration: "Please specify the loan duration:",
  enterYears: "Enter the number of years:",
  exampleYears: "Example: 4 or 6.5. Enter 0 to specify term in months only.",
  enterMonths: "Enter the number of months:",
  exampleMonths: "Example: 3 or 84 (equivalent to 7 years.)",
  results: "Results",
  monthlyPayment: amount => `Payment Every Month: $${amount}`,
  totalPayment: (count, payment) => `Total of ${count} Payments: $${payment}`,
  totalInterest: interest => `Total Interest: $${interest}\n`,
  newCalc: "Enter 'y' to start another calculation",
  exit: "Enter any other character to exit.",
  invalid: "Invalid entry.",
};

function prompt(line1, line2) {
  line2 = line2 ? "\n   " + line2 : "";
  console.log(`=> ${line1}${line2}`);
}

function isInvalidInput(input) {
  return input.trim === "" || input < 0 || Number.isNaN(parseFloat(input));
}

function getInput(message1, message2) {
  prompt(message1, message2);
  let input = parseFloat(rlSync.prompt());
  while (isInvalidInput(input)) {
    prompt(messages.invalid);
    input = parseFloat(rlSync.prompt());
  }
  return input;
}

function computeMonthlyPayment(principal, monthlyRate, durationMonths) {
  if (monthlyRate === 0) return principal / durationMonths;
  if (durationMonths === 0) return principal;

  return (
    principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -durationMonths)))
  );
}

function displayResults() {
  prompt(messages.results, "-------");
  prompt(messages.monthlyPayment(monthlyPayment.toFixed(2)));
  prompt(
    messages.totalPayment(durationMonths.toFixed(2), totalPayment.toFixed(2))
  );
  prompt(messages.totalInterest(totalInterest.toFixed(2)));
}

function newCalc() {
  prompt(messages.newCalc, messages.exit);
  if (rlSync.prompt().toLowerCase()[0] !== "y") return false;
  console.clear();
  return true;
}

console.clear();
prompt(messages.welcom, "---------------------------");

do {
  principal = getInput(messages.enterAmount, messages.exampleAmount);
  monthlyRate = getInput(messages.enterRate, messages.exampleRate) / 1200;

  prompt(messages.specifyDuration);
  durationMonths = getInput(messages.enterYears, messages.exampleYears) * 12;
  durationMonths += getInput(messages.enterMonths, messages.exampleMonths);

  monthlyPayment = computeMonthlyPayment(
    principal,
    monthlyRate,
    durationMonths
  );

  totalPayment = durationMonths * monthlyPayment;
  totalInterest = totalPayment - principal;

  displayResults();
} while (newCalc());
