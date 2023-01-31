const rlSync = require("readline-sync");

let principal = 0;
let monthlyRate = 0;
let durationMonths = 0;
let monthlyPayment = 0;
let totalPayment = 0;
let totalInterest = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function isInvalidInput(input) {
  return input.trim === "" || input < 0 || Number.isNaN(parseFloat(input));
}

function getInput(promptMessage) {
  prompt(promptMessage);
  let input = parseFloat(rlSync.prompt());
  while (isInvalidInput(input)) {
    prompt("Invalid entry.");
    input = parseFloat(rlSync.prompt());
  }
  return input;
}

function computeMonthlyPayment(principal, monthlyRate, durationMonths) {
  if (monthlyRate === 0) {
    return principal / durationMonths;
  } else if (durationMonths === 0) {
    return principal;
  } else {
    return (
      principal *
      (monthlyRate / (1 - Math.pow(1 + monthlyRate, -durationMonths)))
    );
  }
}

function newCalc() {
  prompt(
    "Enter 'y' to start another calculation\n   Enter any other character to exit."
  );
  let answer = rlSync.prompt().toLowerCase();
  return answer[0] === "y";
}

prompt("Welcome to Loan Calculator!\n   ---------------------------");

do {
  principal = getInput("Please enter the loan amount greater than 0 in USD:");
  monthlyRate = getInput("Please enter the APR in percentage points:") / 1200;

  prompt("Please enter the loan duration");
  durationMonths = getInput("Enter the number of years:") * 12;
  durationMonths += getInput("Enter the number of months:");

  monthlyPayment = computeMonthlyPayment(
    principal,
    monthlyRate,
    durationMonths
  );

  totalPayment = durationMonths * monthlyPayment;
  totalInterest = totalPayment - principal;

  prompt("Results\n   -------");
  prompt(`Payment Every Month: $${monthlyPayment.toFixed(2)}`);
  prompt(`Total of ${durationMonths} Payments: $${totalPayment.toFixed(2)}`);
  prompt(`Total Interest: $${totalInterest.toFixed(2)}\n`);
} while (newCalc());
