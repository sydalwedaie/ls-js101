/*
Write three different ways to remove all of the elements from the
following array:
*/

let numbers1 = [1, 2, 3, 4];
let numbers2 = [1, 2, 3, 4];
let numbers3 = [1, 2, 3, 4];

numbers1.splice(0);
numbers2.length = 0;

while (numbers3.length > 0) {
  numbers3.pop();
}

console.log(numbers1);
console.log(numbers2);
console.log(numbers3);
