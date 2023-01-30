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

prompt("Welcome to Loan Calculator!\n   ---------------------------");

while (true) {
  while (true) {
    prompt("Please enter the loan amount greater than 0 in USD:");
    principal = parseFloat(rlSync.prompt());
    if (principal) break;
    else prompt("Invalid entry.");
  }

  while (true) {
    prompt("Please enter the APR in percentage points:");
    monthlyRate = parseFloat(rlSync.prompt()) / 1200;
    if (monthlyRate || monthlyRate === 0) break;
    else prompt("Invalid entry.");
  }

  prompt("Please enter the loan duration");

  while (true) {
    prompt("Enter the number of years (whole numbers):");
    durationMonths = parseFloat(rlSync.prompt()) * 12;
    if (durationMonths || durationMonths === 0) break;
    else prompt("Invalid entry.");
  }

  while (true) {
    prompt("Enter the number of months (whole numbers):");
    let input = parseFloat(rlSync.prompt());
    if (durationMonths === 0 && input === 0) {
      prompt("The duration must be at least 1 month.");
    } else if (input === 0 || input) {
      durationMonths += input;
      break;
    } else prompt("Invalid entry.");
  }

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

  prompt("Start a new calculation?");
  let answer = rlSync.prompt().toLowerCase();
  while (!["y", "n"].includes(answer[0])) {
    prompt("Please enter 'y' or 'n'.");
    answer = rlSync.prompt().toLowerCase();
  }
  if (answer[0] === "n") break;
}
