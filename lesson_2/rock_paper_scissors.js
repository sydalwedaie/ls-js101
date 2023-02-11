const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const FINISHING_SCORE = 3;

// keys are set to an array of choices they can beat
const RULES = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

let messages = {
  welcom: "Welcome to the RPS game, enhanced edition!",
  instructions:
    "This is similar to the classic RPS game with two extra objects: lizard and spock. Each object can beat two other objects. The rules are listed in the table below:",
  startPrompt: "Enter any key to start",
  enterChoice: `Choose one: ${VALID_CHOICES.join(", ")}`,
  choiceInstruction:
    "You can either enter the full name or the first two letters",
  invalidChoice: "That's not a valid choice",
  userWins: "Wahooo! You win!",
  computerWins: "Gosh! Computer wins!",
  tie: "It's a tie!",
  playAgain: "Play again? y/n",
  playAgainError: "Please enter y or n",
  farewell: "Thank you for playing!",
};

let roundNumber = 1;
let userScore = 0;
let computerScore = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function promptError(message) {
  console.log("\x1b[31m%s\x1b[0m", `=> ${message}`);
}

function promptInfo(message) {
  console.log("\x1b[36m%s\x1b[0m", `=> ${message}`);
}

function promptResult(message) {
  console.log("\x1b[33m%s\x1b[0m", `=> ${message}`);
}

function displayWelcom() {
  console.clear();
  prompt(messages.welcom);
  prompt(messages.instructions);
  console.table(RULES);
  prompt(messages.startPrompt);
}

function getUserChoice() {
  prompt(messages.enterChoice);
  prompt(messages.choiceInstruction);

  let input = readline.question().toLowerCase();
  let userChoice = getFullName(input) || input;

  while (!VALID_CHOICES.includes(userChoice)) {
    promptError(messages.invalidChoice);
    input = readline.question().toLowerCase();
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
  if (userScore > computerScore) promptResult(messages.userWins);
  else if (userScore < computerScore) promptResult(messages.computerWins);
  else promptResult(messages.tie);
}

function displayEndGame(roundNumber, userScore, computerScore) {
  console.clear();
  displayScoreboard(roundNumber, userScore, computerScore);
  if (userScore === FINISHING_SCORE) {
    promptResult(`You beat the computer in ${roundNumber} rounds!`);
  } else if (computerScore === FINISHING_SCORE) {
    promptResult(`The computer beat you in ${roundNumber} rounds! Game Over!`);
  }
  prompt(messages.farewell);
}

function displayScoreboard(roundNumber, userScore, computerScore) {
  promptInfo(`Round Number: ${roundNumber}`);
  promptInfo(`Your score: ${userScore}`);
  promptInfo(`Computer score: ${computerScore}`);
  prompt("------------------");
}

function newGame() {
  roundNumber += 1;

  prompt(messages.playAgain);
  let playAgain = readline.question().trim().toLowerCase();

  while (playAgain !== "y" && playAgain !== "n") {
    promptError(messages.playAgainError);
    playAgain = readline.question().trim().toLowerCase();
  }

  if (playAgain === "n") {
    prompt(messages.farewell);
    return false;
  }

  return true;
}

function startGame() {
  do {
    console.clear();
    displayScoreboard(roundNumber, userScore, computerScore);

    let userChoice = getUserChoice();

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    prompt(`You chose: ${userChoice}, computer chose: ${computerChoice}`);

    play(userChoice, computerChoice);
    displayResults(userScore, computerScore);

    if (userScore === FINISHING_SCORE || computerScore === FINISHING_SCORE) {
      displayEndGame(roundNumber, userScore, computerScore);
      break;
    }
  } while (newGame());
}

displayWelcom();

let start = readline.question();
if (start || start.trim() === "") startGame();
