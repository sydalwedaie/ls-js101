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

let loanInfo = {
  principal: 0,
  annualPercentageRate: 0,
  duration: {
    years: 0,
    months: 0,
  },
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function calculatePaymentMonthly(
  principal,
  monthlyPercentageRate,
  durationMonths
) {
  return (
    principal *
    (monthlyPercentageRate /
      (1 - Math.pow(1 + monthlyPercentageRate, -durationMonths)))
  );
}

prompt("Welcome to Loan Calculator!\n");

prompt("Please enter the loan amount in USD:");
loanInfo.principal = parseFloat(rlSync.prompt());

prompt("Please enter the APR in percentage points:");
loanInfo.annualPercentageRate = parseFloat(rlSync.prompt()) / 100;

prompt("please enter the loan duration in years:");
loanInfo.duration.years = parseFloat(rlSync.prompt());

let loanPaymentMonthly = calculatePaymentMonthly(
  loanInfo.principal,
  loanInfo.annualPercentageRate / 12,
  loanInfo.duration.years * 12 + loanInfo.duration.months
);

prompt(`Your monthly payment will be: $${loanPaymentMonthly.toFixed(2)}`);
