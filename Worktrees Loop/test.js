// Simple test runner for the three buggy functions

const { getLastElement, getUserEmail, calculateAverage } = require('./utils.js');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✓ ${testName}`);
    passed++;
  } else {
    console.log(`✗ ${testName}`);
    failed++;
  }
}

function assertEquals(actual, expected, testName) {
  if (actual === expected) {
    console.log(`✓ ${testName}`);
    passed++;
  } else {
    console.log(`✗ ${testName}`);
    console.log(`  Expected: ${expected}`);
    console.log(`  Actual: ${actual}`);
    failed++;
  }
}

console.log('Running tests...\n');

// Tests for BUG 1: getLastElement
console.log('Testing getLastElement:');
assertEquals(getLastElement([1, 2, 3, 4, 5]), 5, 'should return last element');
assertEquals(getLastElement(['a', 'b', 'c']), 'c', 'should work with strings');
assertEquals(getLastElement([42]), 42, 'should work with single element');
assertEquals(getLastElement([]), undefined, 'should return undefined for empty array');

console.log('\nTesting getUserEmail:');
// Tests for BUG 2: getUserEmail
assertEquals(getUserEmail({ email: 'test@example.com' }), 'TEST@EXAMPLE.COM', 'should uppercase email');
assertEquals(getUserEmail({ email: 'user@domain.org' }), 'USER@DOMAIN.ORG', 'should handle different domains');

try {
  getUserEmail(null);
  console.log('✗ should handle null user');
  failed++;
} catch (e) {
  // Currently throws error - test expects graceful handling
  console.log('✗ should handle null user (throws error instead)');
  failed++;
}

try {
  getUserEmail({ name: 'John' }); // user without email property
  console.log('✗ should handle user without email');
  failed++;
} catch (e) {
  console.log('✗ should handle user without email (throws error instead)');
  failed++;
}

console.log('\nTesting calculateAverage:');
// Tests for BUG 3: calculateAverage
assertEquals(calculateAverage([10, 20, 30]), 20, 'should calculate average correctly');
assertEquals(calculateAverage([5, 5, 5, 5]), 5, 'should handle identical numbers');
assertEquals(calculateAverage([100]), 100, 'should handle single number');
assertEquals(calculateAverage([]), 0, 'should return 0 for empty array');

console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`${'='.repeat(40)}`);

process.exit(failed > 0 ? 1 : 0);
