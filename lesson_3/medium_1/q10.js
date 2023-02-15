// What's returned?

// always returns yes
function foo(param = "no") {
  return "yes";
}

function bar(param = "no") {
  return param === "no" ? "yes" : "no";
}

console.log(bar(foo())); // bar('yes') => 'no'
