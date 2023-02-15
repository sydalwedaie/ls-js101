// What's the output?

let object = { first: [1] };
let numArray = object["first"];
numArray.push(2);

console.log(numArray); //  => "[1, 2]"
console.log(object); // => {first: [1, 2]}

/*
numArray poins to the same array reference in the object; therefore, mutating it
will be reflected everywhere, including in the original object.
*/
