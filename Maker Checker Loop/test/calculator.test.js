import { add, subtract, multiply, divide } from '../src/calculator.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`❌ FAIL: ${message}`);
  }
}

console.log('Running calculator tests...\n');

assert(add(2, 3) === 5, 'add(2, 3) should equal 5');
assert(add(-1, 1) === 0, 'add(-1, 1) should equal 0');

assert(subtract(5, 3) === 2, 'subtract(5, 3) should equal 2');
assert(subtract(0, 5) === -5, 'subtract(0, 5) should equal -5');

assert(multiply(3, 4) === 12, 'multiply(3, 4) should equal 12');
assert(multiply(5, 0) === 0, 'multiply(5, 0) should equal 0');

assert(divide(10, 2) === 5, 'divide(10, 2) should equal 5');
assert(divide(7, 2) === 3.5, 'divide(7, 2) should equal 3.5');

try {
  divide(5, 0);
  failed++;
  console.error('❌ FAIL: divide(5, 0) should throw an error');
} catch (e) {
  if (e.message === 'Division by zero') {
    passed++;
  } else {
    failed++;
    console.error('❌ FAIL: divide(5, 0) threw wrong error');
  }
}

console.log(`\n${'='.repeat(40)}`);
console.log(`Tests: ${passed + failed} total`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`${'='.repeat(40)}`);

if (failed > 0) {
  console.log('\n❌ RESULT: FAIL');
  process.exit(1);
} else {
  console.log('\n✅ RESULT: PASS');
  process.exit(0);
}
