const rlSync = require("readline-sync");

let loan = {
  principal: 0,
  monthlyRate: 0,
  durationMonths: 0,
  monthlyPayment: 0,
  totalPayment: 0,
  totalInterest: 0,
  computeLoan: function () {
    this.monthlyPayment = computeMonthlyPayment(this);
    this.totalPayment = this.durationMonths * this.monthlyPayment;
    this.totalInterest = this.totalPayment - this.principal;
  },
};

let messages = {
  welcom: "Welcome to Loan Calculator!",
  enterAmount: "Please enter the loan amount in USD:",
  exampleAmount: "Example: Type 10000 for $10,000",
  enterRate: "Please enter the APR in percentage points:",
  exampleRate: "Example: Type 4.2 for 4.2%",
  specifyDuration: "Please specify the loan duration:",
  enterYears: "Enter the number of years:",
  exampleYears: "Example: 4 or 6.5. Enter 0 to specify term in months only.",
  enterMonths: "Enter the number of months:",
  exampleMonths: "Example: 3 or 84 (equivalent to 7 years.)",
  zeroDuration: "Duration must be more than zero.",
  results: "Results",
  newCalc: "Enter 'y' to start another calculation",
  exit: "Enter any other character to exit.",
  bye: "Thank you for using the Loan Calculator!",
  invalid: "Invalid entry.",
  displayMonthlyPayment: amount => `Payment Every Month: $${amount}`,
  displayTotalInterest: interest => `Total Interest: $${interest}\n`,
  displayTotalPayment: (count, payment) =>
    `Total of ${count} Payments: $${payment}`,
};

function prompt(line1, line2) {
  line2 = line2 ? "\n   " + line2 : "";
  console.log(`=> ${line1}${line2}`);
}

function isInvalidInput(input) {
  return (
    input.trim === "" ||
    input < 0 ||
    input === Infinity ||
    Number.isNaN(parseFloat(input))
  );
}

function getInput(message1, message2) {
  prompt(message1, message2);
  let input = parseFloat(rlSync.prompt());
  while (isInvalidInput(input)) {
    prompt(messages.invalid);
    input = parseFloat(rlSync.prompt());
  }
  return input;
}

function computeMonthlyPayment(loan) {
  const { principal, monthlyRate, durationMonths } = loan;
  if (durationMonths === 0) return principal;
  if (monthlyRate === 0) return principal / durationMonths;

  return (
    principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -durationMonths)))
  );
}

function displayResults(loan, messages) {
  const {
    results,
    displayMonthlyPayment,
    displayTotalPayment,
    displayTotalInterest,
  } = messages;
  const { monthlyPayment, durationMonths, totalPayment } = loan;
  prompt(results, "-------");
  prompt(displayMonthlyPayment(monthlyPayment.toFixed(2)));
  prompt(
    displayTotalPayment(durationMonths.toFixed(2), totalPayment.toFixed(2))
  );
  prompt(displayTotalInterest(loan.totalInterest.toFixed(2)));
}

function newCalc() {
  prompt(messages.newCalc, messages.exit);
  if (rlSync.prompt().toLowerCase()[0] !== "y") {
    prompt(messages.bye);
    return false;
  }
  console.clear();
  return true;
}

console.clear();
prompt(messages.welcom, "---------------------------");

do {
  loan.principal = getInput(messages.enterAmount, messages.exampleAmount);
  loan.monthlyRate = getInput(messages.enterRate, messages.exampleRate) / 1200;

  prompt(messages.specifyDuration);
  do {
    loan.durationMonths =
      getInput(messages.enterYears, messages.exampleYears) * 12;
    loan.durationMonths += getInput(
      messages.enterMonths,
      messages.exampleMonths
    );
    if (loan.durationMonths === 0) prompt(messages.zeroDuration);
  } while (loan.durationMonths === 0);

  loan.computeLoan();
  displayResults(loan, messages);
} while (newCalc());
