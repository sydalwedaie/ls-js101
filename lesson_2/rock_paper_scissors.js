/*

If player a chooses rock and player b chooses scissors, player a wins.
If player a chooses paper and player b chooses rock, player a wins.
If player a chooses scissors and player b chooses paper, player a wins.
If both players choose the same item, neither player wins. It's a tie.

rock > scissors
paper > rock
scissors > paper
*/

const readline = require("readline-sync");

let userChoice = Number(
  readline.question("Choose: 1) Rock 2) Paper 3) Scissors -> ")
);
let computerChoice = Math.floor(Math.random() * 3) + 1;

function determineWinner(playerA, playerB) {
  if (playerA === playerB) return "tie";
  else if (
    (playerA === 1 || playerB === 1) &&
    (playerA === 3 || playerB === 3)
  ) {
    return playerA < playerB ? "playerA" : "playerB";
  } else if (
    (playerA === 2 || playerB === 2) &&
    (playerA === 1 || playerB === 1)
  ) {
    return playerA > playerB ? "playerA" : "playerB";
  } else if (
    (playerA === 3 || playerB === 3) &&
    (playerA === 2 || playerB === 2)
  ) {
    return playerA > playerB ? "playerA" : "playerB";
  }
  return null;
}

console.log(`You chose: ${userChoice}`);
console.log(`Computer chose: ${computerChoice}`);
console.log(determineWinner(userChoice, computerChoice));
