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

function prompt(message) {
  console.log(`=> ${message}`);
}

prompt("Welcome to Loan Calculator!\n");

prompt("Please enter the loan amount in USD:");
let loanAmountUsd = parseFloat(rlSync.prompt());

prompt("Please enter the APR in percentage points:");
let loanApr = parseFloat(rlSync.prompt()) / 100;

prompt("please enter the loan duration:");
let loanDurationYears = parseFloat(rlSync.prompt());

let loanDurationMonths = loanDurationYears * 12;

function calculatePaymentMonthly(amount, apr, durationMonths) {
  let rateMonthly = apr / 12;
  return (
    amount * (rateMonthly / (1 - Math.pow(1 + rateMonthly, -durationMonths)))
  );
}
let loanPaymentMonthly = calculatePaymentMonthly(
  loanAmountUsd,
  loanApr,
  loanDurationMonths
);

prompt(`Your monthly payment will be: $${loanPaymentMonthly.toFixed(2)}`);
