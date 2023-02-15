/*
write a program that outputs The Flintstones Rock! 10 times, with each line
indented 1 space to the right of the line above it.
*/

for (let margin = 0; margin < 11; margin++) {
  console.log(" ".repeat(margin) + "The Flintstones Rock!");
}
