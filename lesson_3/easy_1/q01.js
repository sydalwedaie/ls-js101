// Will the code below raise an error?

let numbers = [1, 2, 3];
numbers[6] = 5;

// No. 3 unset elements (empty slots) would be created.

// Bonus
let numbers = [1, 2, 3];
numbers[6] = 5;
numbers[4]; // what will this line return?

// This returns undefined, although the actually value stored is not the primitive value undefined itself.
