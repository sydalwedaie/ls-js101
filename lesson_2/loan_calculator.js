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
  annualRate: 0,
  duration: {
    years: 0,
    months: 0,
  },
  monthlyPayment: 0,
  paymentsCount: 0,
  totalPayment: 0,
  totalInterest: 0,
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function computeMonthlyPayment(principal, monthlyRate, durationMonths) {
  return (
    principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -durationMonths)))
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
  loanInfo.annualRate = parseFloat(rlSync.prompt()) / 100;
  if (loanInfo.annualRate || loanInfo.annualRate === 0) {
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

loanInfo.monthlyPayment = computeMonthlyPayment(
  loanInfo.principal,
  loanInfo.annualRate / 12,
  loanInfo.duration.years * 12 + loanInfo.duration.months
);

loanInfo.paymentsCount =
  loanInfo.duration.years * 12 + loanInfo.duration.months;
loanInfo.totalPayment = loanInfo.paymentsCount * loanInfo.monthlyPayment;
loanInfo.totalInterest = loanInfo.totalPayment - loanInfo.principal;

prompt("Results");
prompt(`Payment Every Month: $${loanInfo.monthlyPayment.toFixed(2)}`);
prompt(
  `Total of ${
    loanInfo.paymentsCount
  } Payments: $${loanInfo.totalPayment.toFixed(2)}`
);
prompt(`Total Interest: $${loanInfo.totalInterest.toFixed(2)}`);
