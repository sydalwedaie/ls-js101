// Same result?

function first() {
  return {
    prop1: "hi there",
  };
}

function second() {
  return;
  {
    prop1: "hi there";
  }
}

console.log(first()); // {prop1: "hi there"}
console.log(second()); // undefined

// In second, a semicolon automatically is added to the return statement and
// the the rest never runs.
