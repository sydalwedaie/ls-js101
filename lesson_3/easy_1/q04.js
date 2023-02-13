/* Using the following string, create a new string that contains
all lowercase letters except for the first character, which should
be capitalized. (See the example output.)
 */

let munstersDescription = "the Munsters are CREEPY and Spooky.";
// => The munsters are creepy and spooky.

console.log(
  munstersDescription[0].toUpperCase() +
    munstersDescription.slice(1).toLocaleLowerCase()
);
