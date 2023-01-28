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
let loanApr = parseFloat(rlSync.prompt());

prompt("please enter the loan duration:");
let loanDurationYears = parseFloat(rlSync.prompt());

let loanRateMonthly = loanApr / 12;
let loanDurationMonths = loanDurationYears * 12;
let loanPaymentMonthly =
  loanAmountUsd *
  (loanRateMonthly / (1 - Math.pow(1 + loanRateMonthly, -loanDurationMonths)));

prompt(`Your monthly payment will be: $${loanPaymentMonthly}`);
