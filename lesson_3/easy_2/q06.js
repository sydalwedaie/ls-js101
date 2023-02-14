/*
Create a new array that contains all of the flintstones values, but in an
un-nested format:
*/

let flintstones = ["Fred", "Wilma", ["Barney", "Betty"], ["Bambam", "Pebbles"]];

let array1 = [].concat(...flintstones);
let array2 = flintstones.reduce((acc, el) => acc.concat(el), []);
let array3 = flintstones.flat();

console.log(array1);
console.log(array2);
console.log(array3);
