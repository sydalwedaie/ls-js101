// What's logged?

function snippetA() {
  function messWithVars(one, two, three) {
    one = two;
    two = three;
    three = one;
  }

  let one = ["one"];
  let two = ["two"];
  let three = ["three"];

  messWithVars(one, two, three);

  console.log(`one is: ${one}`); // one is: one
  console.log(`two is: ${two}`); // two is: two
  console.log(`three is: ${three}`); // three is: three

  // the parameters shadow the global variables of the same name
  // reassingment of this shaddowing variables have no effect on the global ones
}

function snippetB() {
  function messWithVars(one, two, three) {
    one = ["two"];
    two = ["three"];
    three = ["one"];
  }

  let one = ["one"];
  let two = ["two"];
  let three = ["three"];

  messWithVars(one, two, three);

  console.log(`one is: ${one}`);
  console.log(`two is: ${two}`);
  console.log(`three is: ${three}`);

  // The parameters are reassigned to brand new arrays
  // The operation has no effect on the global variables
}

function snippetC() {
  function messWithVars(one, two, three) {
    one.splice(0, 1, "two");
    two.splice(0, 1, "three");
    three.splice(0, 1, "one");
  }

  let one = ["one"];
  let two = ["two"];
  let three = ["three"];

  messWithVars(one, two, three);

  console.log(`one is: ${one}`); // one is: two
  console.log(`two is: ${two}`); // two is: three
  console.log(`three is: ${three}`); // three is: one

  // The operation is mutating
}

snippetA();
console.log();
snippetB();
console.log();
snippetC();
