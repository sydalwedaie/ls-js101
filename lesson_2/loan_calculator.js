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

function parseDuration(string) {
  let years = 0;
  let months = 0;
  let splitString = string.split(/[a-z]/);
  if (string.includes("y") && string.includes("m")) {
    [years, months] = splitString;
  } else if (string.includes("y")) {
    years = splitString[0];
  } else if (string.includes("m")) {
    months = splitString[0];
  }
  return { years: parseFloat(years), months: parseFloat(months) };
}

prompt("Welcome to Loan Calculator!\n");

while (true) {
  prompt("Please enter the loan amount in USD:");
  loanInfo.principal = parseFloat(rlSync.prompt());
  if (loanInfo.principal) break;
  else prompt("Invalid entry.");
}

prompt("Please enter the APR in percentage points:");
loanInfo.annualPercentageRate = parseFloat(rlSync.prompt()) / 100;

prompt(
  "Please enter the loan duration\n   (acceptable formats: 3.5y, 2y1m, 20m):"
);
loanInfo.duration = parseDuration(rlSync.prompt());

let loanPaymentMonthly = calculatePaymentMonthly(
  loanInfo.principal,
  loanInfo.annualPercentageRate / 12,
  loanInfo.duration.years * 12 + loanInfo.duration.months
);

prompt(`Your monthly payment will be: $${loanPaymentMonthly.toFixed(2)}`);
