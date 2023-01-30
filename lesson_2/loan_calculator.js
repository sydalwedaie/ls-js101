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
  monthlyRate: 0,
  durationMonths: 0,
  monthlyPayment: 0,
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
  loanInfo.monthlyRate = parseFloat(rlSync.prompt()) / 1200;
  if (loanInfo.monthlyRate || loanInfo.monthlyRate === 0) {
    break;
  } else prompt("Invalid entry.");
}

prompt("Please enter the loan duration");

while (true) {
  prompt("Enter the number of years (whole numbers):");
  loanInfo.durationMonths += parseFloat(rlSync.prompt()) * 12;
  if (loanInfo.durationMonths || loanInfo.durationMonths === 0) {
    break;
  } else prompt("Invalid entry.");
}

while (true) {
  prompt("Enter the number of months (whole numbers):");
  loanInfo.durationMonths += parseFloat(rlSync.prompt());
  if (loanInfo.durationMonths || loanInfo.durationMonths === 0) break;
  else prompt("Invalid entry.");
}

loanInfo.monthlyPayment = computeMonthlyPayment(
  loanInfo.principal,
  loanInfo.monthlyRate,
  loanInfo.durationMonths
);

loanInfo.totalPayment = loanInfo.durationMonths * loanInfo.monthlyPayment;
loanInfo.totalInterest = loanInfo.totalPayment - loanInfo.principal;

prompt("Results");
prompt(`Payment Every Month: $${loanInfo.monthlyPayment.toFixed(2)}`);
prompt(
  `Total of ${
    loanInfo.durationMonths
  } Payments: $${loanInfo.totalPayment.toFixed(2)}`
);
prompt(`Total Interest: $${loanInfo.totalInterest.toFixed(2)}`);
