/*
Is there a difference between these implementations, other than the method she used to add an element to the buffer? You may assume that newElement will always be a primitive value.
*/

// This one mutates the passed in buffer
function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

// This one does NOT mutate the buffer
function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer = buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

// both return the same value
