/*

If player a chooses rock and player b chooses scissors, player a wins.
If player a chooses paper and player b chooses rock, player a wins.
If player a chooses scissors and player b chooses paper, player a wins.
If both players choose the same item, neither player wins. It's a tie.

rock (0) > scissors (2)
paper (1) > rock (0)
scissors (2) > paper (1)
*/

const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors"];

function prompt(message) {
  console.log(`=> ${message}`);
}

function getUserChoice() {
  prompt(`Choose one: ${VALID_CHOICES.join(", ")}`);
  let userChoice = readline.question();

  while (!VALID_CHOICES.includes(userChoice)) {
    prompt("That's not a valid choice");
    userChoice = readline.question();
  }
  return userChoice;
}

function displayWinner(playerA, playerB) {
  if (
    (playerA === VALID_CHOICES[0] && playerB === VALID_CHOICES[2]) ||
    (playerA === VALID_CHOICES[1] && playerB === VALID_CHOICES[0]) ||
    (playerA === VALID_CHOICES[2] && playerB === VALID_CHOICES[1])
  ) {
    prompt("You win!");
  } else if (
    (playerA === VALID_CHOICES[2] && playerB === VALID_CHOICES[0]) ||
    (playerA === VALID_CHOICES[0] && playerB === VALID_CHOICES[1]) ||
    (playerA === VALID_CHOICES[1] && playerB === VALID_CHOICES[2])
  ) {
    prompt("Computer wins!");
  } else {
    prompt("It's a tie!");
  }
}

function newGame() {
  prompt("Another Game? y/n");
  let anotherGame = readline.question().trim()[0].toLowerCase();
  while (anotherGame !== "y" && anotherGame !== "n") {
    prompt("Please enter y or n");
    anotherGame = readline.question().trim()[0].toLowerCase();
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
