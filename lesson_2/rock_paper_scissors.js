const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];

// keys are set to an array of choices they can beat
const RULES = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function getUserChoice() {
  prompt(
    `Choose one: ${VALID_CHOICES.join(
      ", "
    )}\n   (You can also enter the first two letters)`
  );
  let input = readline.question();
  let userChoice = getFullName(input) || input;

  while (!VALID_CHOICES.includes(userChoice)) {
    prompt("That's not a valid choice");
    input = readline.question();
    userChoice = getFullName(input) || input;
  }
  return userChoice;
}

function getFullName(abbrevation) {
  switch (abbrevation) {
    case "ro":
      return VALID_CHOICES[0];
    case "pa":
      return VALID_CHOICES[1];
    case "sc":
      return VALID_CHOICES[2];
    case "li":
      return VALID_CHOICES[3];
    case "sp":
      return VALID_CHOICES[4];
    default:
      return null;
  }
}

function displayWinner(playerA, playerB) {
  if (RULES[playerA].includes(playerB)) {
    prompt("You win!");
  } else if (RULES[playerB].includes(playerA)) {
    prompt("Computer wins!");
  } else {
    prompt("It's a tie!");
  }
}

function newGame() {
  prompt("Another Game? y/n");
  let anotherGame = readline.question().trim().toLowerCase()[0];
  while (anotherGame !== "y" && anotherGame !== "n") {
    prompt("Please enter y or n");
    anotherGame = readline.question().trim().toLowerCase()[0];
  }
  if (anotherGame === "n") {
    prompt("Thank you for playing.");
    return false;
  }
  return true;
}

do {
  console.clear();
  let userChoice = getUserChoice();

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  prompt(`You chose: ${userChoice}, computer chose: ${computerChoice}`);

  displayWinner(userChoice, computerChoice);
} while (newGame());
