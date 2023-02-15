/*
Return a new string that swaps the case of all of the letters:
"The Munsters are creepy and spooky."
=> `tHE mUNSTERS ARE CREEPY AND SPOOKY.`
*/

let munstersDescription = "The Munsters are creepy and spooky.";

let swapped = munstersDescription
  .split("")
  .map(function (char) {
    if (char === char.toUpperCase()) return char.toLowerCase();
    return char.toUpperCase();
  })
  .join("");

console.log(swapped);
