// show two different ways to put the expected "Four score and " in front of it.

let famousWords = "seven years ago...";
let str = "Four score and ";

console.log(str + famousWords);
console.log(`${str}${famousWords}`);
console.log(str.concat(famousWords));
