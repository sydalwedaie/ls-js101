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

let roundNumber = 1;
let userScore = 0;
let computerScore = 0;

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

function play(playerA, playerB) {
  if (RULES[playerA].includes(playerB)) {
    userScore += 1;
  } else if (RULES[playerB].includes(playerA)) {
    computerScore += 1;
  }
}

function displayResults(userScore, computerScore) {
  if (userScore > computerScore) prompt("You win!");
  else if (userScore < computerScore) prompt("Computer wins!");
  else prompt("It's a tie!");

  prompt(`Your score: ${userScore}`);
  prompt(`Computer score: ${computerScore}`);
}

function displayEndGame(roundNumber, userScore, computerScore) {
  if (userScore === 3) {
    prompt(`You beat the computer in ${roundNumber} rounds!`);
  } else if (computerScore === 3) {
    prompt(`The computer beat you in ${roundNumber} rounds! Game Over!`);
  }
}

function newGame() {
  roundNumber += 1;

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
  prompt(`Round Number: ${roundNumber}`);
  let userChoice = getUserChoice();

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  prompt(`You chose: ${userChoice}, computer chose: ${computerChoice}`);

  play(userChoice, computerChoice);
  displayResults(userScore, computerScore);

  if (userScore === 3 || computerScore === 3) {
    displayEndGame(roundNumber, userScore, computerScore);
    break;
  }
} while (newGame());
