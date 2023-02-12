// GLOBAL VARIABLES
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

const messages = {
  welcom: "Welcome to the RPS game, enhanced edition!",
  instructions:
    "This is similar to the classic RPS game with two extra objects: lizard and spock. Each object can beat two other objects. The rules are listed in the table below. The first palyer to win 3 times wins the game.",
  startPrompt: "Enter any key to start",
  enterChoice: `Choose one: ${VALID_CHOICES.join(", ")}`,
  choiceInstruction:
    "You can either enter the full name or the first two letters",
  invalidChoice: "That's not a valid choice",
  userWins: "Wahooo! You win!",
  computerWins: "Gosh! Computer wins!",
  tie: "It's a tie!",
  playAgain: "Hit Enter to play next round, or 'n' to exit:",
  playAgainError: "Invalid input (Enter to play again, 'n' to exit.)",
  farewell: "Thank you for playing!",
};

const gameState = {
  roundNumber: 0,
  userScore: 0,
  userChoice: "",
  computerScore: 0,
  computerChoice: "",
};

// HELPER FUNCTIONS
function blankLine() {
  console.log("");
}
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

function clearLastLines(count) {
  process.stdout.moveCursor(0, -count);
  process.stdout.clearScreenDown();
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
// DISPLAY LOGIC
function displayWelcom() {
  console.clear();
  prompt(messages.welcom);
  blankLine();
  prompt(messages.instructions);
  console.table(RULES);
}

function displayResults({ userChoice, computerChoice }) {
  blankLine();
  if (playerWins(userChoice, computerChoice)) {
    promptResult(messages.userWins);
  } else if (userChoice === computerChoice) {
    promptResult(messages.tie);
  } else promptResult(messages.computerWins);
}

function displayEndGame({ roundNumber, userScore, computerScore }) {
  console.clear();
  displayScoreboard(gameState);

  if (userScore === FINISHING_SCORE) {
    promptResult(`You beat the computer in ${roundNumber} rounds!`);
  } else if (computerScore === FINISHING_SCORE) {
    promptResult(`The computer beat you in ${roundNumber} rounds! Game Over!`);
  }
  prompt(messages.farewell);
}

function displayScoreboard({ roundNumber, userScore, computerScore }) {
  promptInfo(`Round Number: ${roundNumber}`);
  promptInfo(`Your score: ${userScore}`);
  promptInfo(`Computer score: ${computerScore}`);
  prompt("------------------");
}

// GAME LOGIC
function getUserChoice() {
  prompt(messages.enterChoice);
  prompt(messages.choiceInstruction);

  let input = readline.question().toLowerCase();
  let userChoice = getFullName(input) || input;

  while (!VALID_CHOICES.includes(userChoice)) {
    clearLastLines(2);
    promptError(messages.invalidChoice);
    input = readline.question().toLowerCase();
    userChoice = getFullName(input) || input;
  }
  return userChoice;
}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  return VALID_CHOICES[randomIndex];
}

function playerWins(userChoice, computerChoice) {
  return RULES[userChoice].includes(computerChoice);
}

function updateScoreboard(gameState) {
  if (playerWins(gameState.userChoice, gameState.computerChoice)) {
    gameState.userScore++;
  } else if (!(gameState.userChoice === gameState.computerChoice)) {
    gameState.computerScore++;
  }
}

function newRound(gameState) {
  blankLine();
  prompt(messages.playAgain);
  let playAgain = readline.question().trim().toLowerCase();

  while (playAgain !== "n" && playAgain !== "") {
    clearLastLines(2);
    promptError(messages.playAgainError);
    playAgain = readline.question().trim().toLowerCase();
  }

  if (playAgain === "n") {
    prompt(messages.farewell);
    return false;
  }

  return true;
}

function isEndGame(gameState) {
  return (
    gameState.userScore === FINISHING_SCORE ||
    gameState.computerScore === FINISHING_SCORE
  );
}

function gameLoop(gameState) {
  do {
    gameState.roundNumber += 1;
    console.clear();
    displayScoreboard(gameState);

    gameState.userChoice = getUserChoice();
    gameState.computerChoice = getComputerChoice();

    clearLastLines(1);
    blankLine();

    prompt(
      `You chose: ${gameState.userChoice}, computer chose: ${gameState.computerChoice}`
    );
    displayResults(gameState);
    updateScoreboard(gameState);

    if (isEndGame(gameState)) {
      displayEndGame(gameState);
      break;
    }
  } while (newRound(gameState));
}

function startGame() {
  displayWelcom();
  prompt(messages.startPrompt);
  readline.question();
  gameLoop(gameState);
}

// RUN GAME
startGame();
