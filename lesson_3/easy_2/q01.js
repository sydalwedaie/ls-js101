/*
Given a string, return a new string that replaces
every occurrence of the word "important" with "urgent":
*/

let advice =
  "Few things in life are as important as house training your pet dinosaur. important!";

// using a string for replace only affects the first occurance.
let pattern = /important/g;
console.log(advice.replace(pattern, "urgent"));
