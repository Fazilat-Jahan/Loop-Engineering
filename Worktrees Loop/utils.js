// Utility functions with intentional bugs for demonstration

/**
 * BUG 1: Off-by-one error
 * Should return the last element of an array
 */
function getLastElement(arr) {
  if (!arr || arr.length === 0) {
    return undefined;
  }
  // BUG: Should be arr.length - 1
  return arr[arr.length];
}

/**
 * BUG 2: Missing null/undefined check
 * Should safely get user's email in uppercase
 */
function getUserEmail(user) {
  // Fixed: Add null/undefined check and validate email property exists
  if (!user || !user.email) {
    return undefined;
  }
  return user.email.toUpperCase();
}

/**
 * BUG 3: Incorrect calculation
 * Should calculate the average of an array of numbers
 */
function calculateAverage(numbers) {
  if (!numbers || numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  // BUG: Should divide by numbers.length, not numbers.length + 1
  return sum / (numbers.length + 1);
}

module.exports = {
  getLastElement,
  getUserEmail,
  calculateAverage
};
