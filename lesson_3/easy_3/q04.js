// What will the following code output?

let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);
// [{ first: 42 }, { second: "value2" }, 3, 4, 5]
// The objects inside of the two arrays point to the same location in memory
// so mutating one will be reflected by the other.
