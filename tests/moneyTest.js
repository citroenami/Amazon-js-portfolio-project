import formatCurrency from '../scripts/utils/money.js';

//basic test case ->
// here we test 2 differen situations a.k.a: test cases
console.log('test suite: formatCurrency');
console.log('converts cents into dollars');
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');
// edge cases ->
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');
// (formatCurrency(2000.5) === '20.005') x -> 20.01 
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds down to the nearest cent');
// (formatCurrency(2000.4) === '20.004') x -> 20.00 
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
}


/**
 * we need 2 types of tets cases 
 * 1.basic test cases = tests if the code is working or not
 * (we use a normal number and see if the function is doing
 * what its supposed to)
 * 2.edge cases = test with values that are tricky
 * 'they are on the edge' of what our code can handle
 * here the last two cases are edge cases
 * - give each test case a name
 * - group related tests together
 * group of related tests = test suite
 */