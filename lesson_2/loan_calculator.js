// ----------------
// sodu code
// ----------------
/*

load dependencies
get user input
  - loan amount in USD
  - APR in % point
  - duration (in years)

validate inputs
  - loan amount: floating-point number
  - APR: floating-point number
  - duration: floating-point number

calculate
  - monthly rate
  - duration in months
  - monthly payments in dollars and cents

print output
*/

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

prompt("Welcome to Loan Calculator!\n");

while (true) {
  prompt("Please enter the loan amount in USD:");
  principal = parseFloat(rlSync.prompt());
  if (principal) break;
  else prompt("Invalid entry.");
}

while (true) {
  prompt("Please enter the APR in percentage points:");
  monthlyRate = parseFloat(rlSync.prompt()) / 1200;
  if (monthlyRate || monthlyRate === 0) {
    break;
  } else prompt("Invalid entry.");
}

prompt("Please enter the loan duration");

while (true) {
  prompt("Enter the number of years (whole numbers):");
  durationMonths += parseFloat(rlSync.prompt()) * 12;
  if (durationMonths || durationMonths === 0) {
    break;
  } else prompt("Invalid entry.");
}

while (true) {
  prompt("Enter the number of months (whole numbers):");
  durationMonths += parseFloat(rlSync.prompt());
  if (durationMonths) break;
  else if (durationMonths === 0) {
    prompt("The duration must be at least 1 month.");
  } else prompt("Invalid entry.");
}

monthlyPayment = computeMonthlyPayment(principal, monthlyRate, durationMonths);

totalPayment = durationMonths * monthlyPayment;
totalInterest = totalPayment - principal;

prompt("Results");
prompt(`Payment Every Month: $${monthlyPayment.toFixed(2)}`);
prompt(`Total of ${durationMonths} Payments: $${totalPayment.toFixed(2)}`);
prompt(`Total Interest: $${totalInterest.toFixed(2)}`);
