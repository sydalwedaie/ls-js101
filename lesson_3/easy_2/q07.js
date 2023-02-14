/*
Create an array from this object that contains only two elements:
Barney's name and Barney's number: [ 'Barney', 2 ]
*/

let flintstones = {
  Fred: 0,
  Wilma: 1,
  Barney: 2,
  Betty: 3,
  Bambam: 4,
  Pebbles: 5,
};

console.log(["Barney", flintstones.Barney]);
console.log(Object.entries(flintstones)[2]);
console.log(
  Object.entries(flintstones).filter(prop => prop[0] === "Barney")[0]
);
