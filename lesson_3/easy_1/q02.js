// How can you determine whether a given string ends with
// an exclamation mark (!)?

let str1 = "Come over here!"; // true
let str2 = "What's up, Doc?"; // false

console.log(str1.slice(-1) === "!");
console.log(str2.slice(-1) === "!");

// There is also the "endsWith()" string method!
