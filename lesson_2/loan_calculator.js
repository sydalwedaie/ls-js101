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

while (true) {
  prompt("Please enter the loan amount in USD:");
  loanInfo.principal = parseFloat(rlSync.prompt());
  if (loanInfo.principal) break;
  else prompt("Invalid entry.");
}

while (true) {
  prompt("Please enter the APR in percentage points:");
  loanInfo.annualPercentageRate = parseFloat(rlSync.prompt()) / 100;
  if (loanInfo.annualPercentageRate || loanInfo.annualPercentageRate === 0) {
    break;
  } else prompt("Invalid entry.");
}

prompt("Please enter the loan duration");

while (true) {
  prompt("Enter the number of years (whole numbers):");
  loanInfo.duration.years = parseFloat(rlSync.prompt());
  if (loanInfo.duration.years || loanInfo.duration.years === 0) {
    break;
  } else prompt("Invalid entry.");
}

while (true) {
  prompt("Enter the number of months (whole numbers):");
  loanInfo.duration.months = parseFloat(rlSync.prompt());
  if (loanInfo.duration.months || loanInfo.duration.months === 0) break;
  else prompt("Invalid entry.");
}

let loanPaymentMonthly = calculatePaymentMonthly(
  loanInfo.principal,
  loanInfo.annualPercentageRate / 12,
  loanInfo.duration.years * 12 + loanInfo.duration.months
);

prompt(`Your monthly payment will be: $${loanPaymentMonthly.toFixed(2)}`);
