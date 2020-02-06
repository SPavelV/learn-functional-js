// -run- with two functions
const run2 = function(f, g) {
  return function(x) {
    return f(g(x));
  }
}

// -run- with three functions
const run3 = function(f, g, h) {
  return function(x) {
    return f(g(h(x)));
  }
}

// Test magical functions

const add1 = x => x + 1;
const mult2 = x => x * 2;
const square = x => x * x;
const negate  = x => -x;

const double = run2(add1, add1);

console.log(double(2)); // -> 4

const testRun = run3(negate, square, mult2);

console.log(testRun(2)); // -> -16

const echo = message => message;
const h1 = message => `<h1>${message}</h1>`;
const addToDom = selector => message => document.querySelector(selector).innerHTML = message;
const addToConsole = message => console.log(message);

const printMessage = run3(addToConsole, h1, echo);
printMessage('Hello World'); // -> <h1>Hello wordl</h1>

// imperative
let arr = [0, 1, 2, 4, 5, 6, 7, 8, 9];
for(let i = 0; i < arr.length; i++ ) {
  arr[i] = Math.pow(arr[i], 2);
}
console.log('array: ', arr);

//declarative
const arr2 = [0, 1, 2, 4, 5, 6, 7, 8, 9].map(num => Math.pow(num,2));
console.log('array: ', arr2);

